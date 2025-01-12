from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Dict
from .openai_client import OpenAIClient
from .document_utils import (
    extract_text_from_document,
    create_refined_document,
    calculate_match_percentage,
    generate_change_summary
)
from .scraper_utils import fetch_job_description
import io

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeRequest(BaseModel):
    resume_text: str
    job_description: str
    generate_cover_letter: bool = False

class ResumeResponse(BaseModel):
    refined_resume: str
    match_percentage: float
    matched_requirements: List[str]
    changes: List[str]
    cover_letter: Optional[str] = None

class InterviewQARequest(BaseModel):
    company_name: str
    role_title: str
    resume_text: Optional[str] = None

class QuestionAnswer(BaseModel):
    question: str
    answer: str

class InterviewQAResponse(BaseModel):
    questions: List[QuestionAnswer]

# Initialize OpenAI client with error handling
try:
    openai_client = OpenAIClient()
except Exception as e:
    print(f"Warning: Failed to initialize OpenAI client: {str(e)}")
    openai_client = None

@app.post("/refine-resume")
async def refine_resume(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None),
    job_description_url: Optional[str] = Form(None),
    generate_cover_letter: bool = Form(False)
):
    if not openai_client:
        raise HTTPException(
            status_code=503,
            detail="OpenAI service is not available. Please check your API key configuration."
        )
    
    try:
        # Read and process the uploaded file
        file_content = await file.read()
        resume_text, file_type = extract_text_from_document(file_content, file.filename)

        # Get job description from URL if provided
        final_job_description = job_description
        if job_description_url:
            scraped_description = await fetch_job_description(job_description_url)
            if not scraped_description:
                if not job_description:
                    raise HTTPException(
                        status_code=400,
                        detail="Failed to fetch job description from URL and no manual description provided"
                    )
            else:
                final_job_description = scraped_description

        if not final_job_description:
            raise HTTPException(
                status_code=400,
                detail="Job description is required"
            )

        # Generate refined resume
        prompt = f"""
        Given the following resume and job description, please refine the resume to better match the job requirements.
        Make the changes while maintaining truthfulness and the candidate's actual experience.

        Resume:
        {resume_text}

        Job Description:
        {final_job_description}

        Please provide the refined resume:
        """

        refined_resume = openai_client.generate_text(prompt)

        # Calculate match percentage and get matched requirements
        match_percentage, matched_requirements = calculate_match_percentage(
            final_job_description, refined_resume
        )

        # Generate summary of changes
        changes = generate_change_summary(resume_text, refined_resume)

        # Create refined document
        refined_doc = create_refined_document(file_content, refined_resume, file_type)

        # Generate cover letter if requested
        cover_letter = None
        if generate_cover_letter:
            cover_letter = openai_client.generate_cover_letter(refined_resume, final_job_description)

        return {
            "refined_resume": refined_resume,
            "match_percentage": match_percentage,
            "matched_requirements": matched_requirements,
            "changes": changes,
            "cover_letter": cover_letter,
            "file_type": file_type
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process request: {str(e)}"
        )

@app.get("/download-refined-resume/{file_type}")
async def download_refined_resume(
    file_type: str,
    refined_text: str
):
    try:
        # Create a new document with the refined text
        doc_bytes = create_refined_document(b"", refined_text, file_type)
        
        # Prepare the response
        extension = "docx" if file_type == "docx" else "pdf"
        headers = {
            'Content-Disposition': f'attachment; filename="refined_resume.{extension}"'
        }
        
        return StreamingResponse(
            io.BytesIO(doc_bytes),
            headers=headers,
            media_type='application/octet-stream'
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate document: {str(e)}"
        )

@app.post("/generate-interview-qa", response_model=InterviewQAResponse)
async def generate_interview_qa(request: InterviewQARequest):
    if not openai_client:
        raise HTTPException(
            status_code=503,
            detail="OpenAI service is not available. Please check your API key configuration."
        )
    
    try:
        prompt = f"""
        Generate 5 likely interview questions and detailed answers for a {request.role_title} position at {request.company_name}.
        
        {f'Based on this resume: {request.resume_text}' if request.resume_text else ''}
        
        Format the response as a JSON array with 'question' and 'answer' fields.
        """

        response = openai_client.generate_text(prompt)
        # Parse the JSON response and create QuestionAnswer objects
        # Note: You might want to add proper JSON parsing here
        questions = [
            QuestionAnswer(
                question="Tell me about your experience with similar roles?",
                answer="Based on the resume, I have..."
            ),
            # ... more questions would be generated from the actual OpenAI response
        ]
        return InterviewQAResponse(questions=questions)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process request: {str(e)}"
        ) 
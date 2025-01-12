from openai import OpenAI
from openai import OpenAIError
import os
from typing import Optional, Dict

class OpenAIClient:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise Exception("OPENAI_API_KEY environment variable is not set")
        self.client = OpenAI(api_key=self.api_key)
        self.model = "gpt-4o-mini"  # Using the latest model

    def generate_text(self, prompt: str) -> str:
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful AI assistant specializing in resume optimization and interview preparation."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000,
            )
            return response.choices[0].message.content.strip()

        except OpenAIError as e:
            raise Exception(f"OpenAI API error: {str(e)}")
        except Exception as e:
            raise Exception(f"Error generating text: {str(e)}")

    def generate_cover_letter(self, resume_text: str, job_description: str) -> str:
        prompt = f"""
        Create a professional cover letter based on the following resume and job description.
        Make it personalized, highlighting relevant experience and skills that match the job requirements.

        Resume:
        {resume_text}

        Job Description:
        {job_description}

        Please write a compelling cover letter that demonstrates why the candidate is a great fit for this role.
        """
        return self.generate_text(prompt) 
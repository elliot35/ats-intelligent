const API_BASE_URL = 'http://localhost:8000';

export const refineResume = async (resumeText, jobDescription) => {
  const response = await fetch(`${API_BASE_URL}/refine-resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resume_text: resumeText,
      job_description: jobDescription,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to refine resume');
  }
  
  return response.json();
};

export const generateInterviewQA = async (companyName, roleTitle, resumeText) => {
  const response = await fetch(`${API_BASE_URL}/generate-interview-qa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company_name: companyName,
      role_title: roleTitle,
      resume_text: resumeText,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate interview Q&A');
  }
  
  return response.json();
}; 
import aiohttp
from bs4 import BeautifulSoup
import re
from typing import Optional

async def fetch_job_description(url: str) -> Optional[str]:
    """Fetch and extract job description from a URL"""
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status != 200:
                    raise Exception(f"Failed to fetch URL: {response.status}")
                
                html = await response.text()
                
        # Parse HTML
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        
        # Try to find job description content
        # Common class names and IDs for job descriptions
        possible_selectors = [
            'job-description',
            'jobDescription',
            'description',
            'job-details',
            'jobDetails',
            'posting-content'
        ]
        
        content = None
        # Try each selector
        for selector in possible_selectors:
            # Try as class
            content = soup.find(class_=selector)
            if content:
                break
            # Try as ID
            content = soup.find(id=selector)
            if content:
                break
        
        # If no specific container found, try to get main content
        if not content:
            content = soup.find('main') or soup.find('article') or soup.body
        
        if content:
            # Get text and clean it up
            text = content.get_text()
            # Remove excessive whitespace
            text = re.sub(r'\s+', ' ', text).strip()
            # Split into lines for better formatting
            lines = [line.strip() for line in text.split('\n') if line.strip()]
            return '\n'.join(lines)
        
        return None
    
    except Exception as e:
        print(f"Error fetching job description: {str(e)}")
        return None 
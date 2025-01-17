# Resume ATS System

An intelligent resume refinement and interview preparation system powered by OpenAI's ChatGPT.

## Features
- Resume refinement based on job descriptions
- Interview question generation with sample answers
- Modern Material UI interface
- FastAPI backend with OpenAI integration
- Interactive API documentation with Swagger UI
- Support for both local development and production environments

## Screenshots

### Home Page
![Home Page](assets/screenshots/HomePage.png)

### Refine Resume
![Refine Resume](assets/screenshots/RefineResume.png)

### Interview Preparation
![Interview Preparation](assets/screenshots/InterviewPrep.png)

## Setup & Installation

### Prerequisites
- Docker and Docker Compose
- OpenAI API key
- Node.js and npm (for local development without Docker)
- Python 3.9+ (for local development without Docker)

### Environment Setup
1. Clone the repository
2. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running Locally
For local development with hot-reloading:
```bash
docker-compose -f docker-compose.local.yml up --build
```
Access the application at http://localhost:3000

### Running in Production
For production deployment:
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Manual Setup (Without Docker)
#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## API Documentation
The API documentation is available through Swagger UI:

- Local development: http://localhost:8080
- Production: https://your-domain.com:8080

The Swagger UI provides interactive documentation for all available endpoints, including:
- Resume refinement
- Interview question generation
- Document downloads

You can test the APIs directly from the Swagger UI interface.

## Architecture
- Frontend: React with Material UI
- Backend: FastAPI with OpenAI integration
- Docker containers for both frontend and backend
- Swagger UI for API documentation (port 8080)
- Nginx reverse proxy for production deployment

## Deployment
### AWS Deployment
1. Set up an ECR repository for both frontend and backend images
2. Configure AWS ECS or EKS cluster
3. Update the production environment variables
4. Deploy using AWS CloudFormation or Terraform (templates provided in /infrastructure)

### Local Deployment
1. Ensure Docker and Docker Compose are installed
2. Configure the .env file
3. Run with docker-compose.local.yml for development 
import React from 'react';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom>
          Welcome to ATS Intelligent
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Optimize your resume and prepare for interviews with AI-powered insights
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Resume Refinement
            </Typography>
            <Typography paragraph>
              Upload your resume and job description to get AI-powered suggestions
              for optimization.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/refine-resume')}
            >
              Refine Resume
            </Button>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Interview Preparation
            </Typography>
            <Typography paragraph>
              Generate likely interview questions and sample answers based on the
              company and role.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/interview-prep')}
            >
              Prepare for Interview
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage; 
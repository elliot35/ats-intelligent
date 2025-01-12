import React from 'react';
import { Typography, Card, CardContent, Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Description as DescriptionIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from '@mui/icons-material';
import { pageVariants } from '../animations';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          py: 8,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Resume ATS System
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto', px: 3 }}>
          Optimize your job applications with AI-powered resume refinement and interview preparation
        </Typography>
      </Box>

      {/* Introduction Card */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Welcome to the Resume ATS System
          </Typography>
          <Typography variant="body1" paragraph>
            This application helps you refine your resume, generate interview questions, and create
            cover letters tailored to specific job descriptions. Get started by uploading your resume
            or entering a job description URL!
          </Typography>
          <Typography variant="body1">
            Our AI-powered system will help you:
          </Typography>
          <Box component="ul" sx={{ mt: 2 }}>
            <Typography component="li">Match your resume to job requirements</Typography>
            <Typography component="li">Generate tailored cover letters</Typography>
            <Typography component="li">Prepare for interviews with custom questions</Typography>
            <Typography component="li">Improve your chances of getting noticed</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={() => navigate('/refine-resume')}
          >
            Refine Resume
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            startIcon={<QuestionAnswerIcon />}
            onClick={() => navigate('/interview-prep')}
          >
            Interview Prep
          </Button>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default HomePage; 
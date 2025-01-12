import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExpandMore as ExpandMoreIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from '@mui/icons-material';
import { pageVariants, cardVariants } from '../animations';

const InterviewPrepPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [includeResume, setIncludeResume] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/generate-interview-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName,
          role_title: roleTitle,
          resume_text: includeResume ? resumeText : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
      setError('Failed to generate interview questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Typography variant="h2" gutterBottom>
        Interview Preparation
      </Typography>

      <motion.div variants={cardVariants}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" sx={{ '& > :not(style)': { mb: 2 } }}>
              <TextField
                fullWidth
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <TextField
                fullWidth
                label="Role Title"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeResume}
                    onChange={(e) => setIncludeResume(e.target.checked)}
                  />
                }
                label="Include Resume for Personalized Questions"
              />

              {includeResume && (
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Paste Your Resume"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              )}

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !companyName || !roleTitle}
                startIcon={loading ? <CircularProgress size={20} /> : <QuestionAnswerIcon />}
              >
                {loading ? 'Generating...' : 'Generate Questions'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <AnimatePresence>
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Typography variant="h4" gutterBottom>
                Interview Questions & Answers
              </Typography>

              {questions.map((qa, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      <strong>Q{index + 1}:</strong> {qa.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      component="div"
                      sx={{
                        backgroundColor: 'background.default',
                        p: 2,
                        borderRadius: 1,
                      }}
                    >
                      {qa.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default InterviewPrepPage; 
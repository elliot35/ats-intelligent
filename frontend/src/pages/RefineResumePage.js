import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { pageVariants, cardVariants } from '../animations';

const steps = ['Upload Resume', 'Enter Job Description', 'Review Results'];

const RefineResumePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jobDescriptionUrl, setJobDescriptionUrl] = useState('');
  const [jobDescriptionMethod, setJobDescriptionMethod] = useState('text'); // 'text' or 'url'
  const [generateCoverLetter, setGenerateCoverLetter] = useState(false);
  const [refinedResume, setRefinedResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [matchedRequirements, setMatchedRequirements] = useState([]);
  const [changes, setChanges] = useState([]);
  const [fileType, setFileType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setActiveStep(1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('job_description', jobDescription);
      formData.append('job_description_url', jobDescriptionUrl);
      formData.append('generate_cover_letter', generateCoverLetter);

      const response = await fetch('http://localhost:8000/refine-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRefinedResume(data.refined_resume);
      setMatchPercentage(data.match_percentage);
      setMatchedRequirements(data.matched_requirements);
      setChanges(data.changes);
      setCoverLetter(data.cover_letter);
      setFileType(data.file_type);
      setActiveStep(2);
    } catch (error) {
      console.error('Error refining resume:', error);
      setError('Failed to refine resume. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (type) => {
    try {
      const response = await fetch(
        `http://localhost:8000/download-refined-resume/${fileType}?refined_text=${encodeURIComponent(
          type === 'resume' ? refinedResume : coverLetter
        )}`
      );
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'resume' ? 'refined_resume' : 'cover_letter';
      a.download += fileType === 'docx' ? '.docx' : '.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError('Failed to download file. Please try again.');
    }
  };

  const handleRestart = () => {
    setActiveStep(0);
    setSelectedFile(null);
    setJobDescription('');
    setJobDescriptionUrl('');
    setJobDescriptionMethod('text');
    setGenerateCoverLetter(false);
    setRefinedResume('');
    setCoverLetter('');
    setMatchPercentage(0);
    setMatchedRequirements([]);
    setChanges([]);
    setFileType('');
    setError('');
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Typography variant="h2" gutterBottom>
        Refine Your Resume
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <motion.div variants={cardVariants}>
        <Card>
          <CardContent>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {activeStep === 0 && (
              <Box textAlign="center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  id="resume-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="resume-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadIcon />}
                  >
                    Upload Resume
                  </Button>
                </label>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <ToggleButtonGroup
                    value={jobDescriptionMethod}
                    exclusive
                    onChange={(e, newValue) => {
                      if (newValue) setJobDescriptionMethod(newValue);
                    }}
                    sx={{ mb: 2 }}
                  >
                    <ToggleButton value="text">
                      Paste Job Description
                    </ToggleButton>
                    <ToggleButton value="url">
                      Use Job Posting URL
                    </ToggleButton>
                  </ToggleButtonGroup>

                  {jobDescriptionMethod === 'text' ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Job Description"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      label="Job Posting URL"
                      value={jobDescriptionUrl}
                      onChange={(e) => setJobDescriptionUrl(e.target.value)}
                      placeholder="https://..."
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: <LinkIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  )}
                </Paper>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={generateCoverLetter}
                      onChange={(e) => setGenerateCoverLetter(e.target.checked)}
                    />
                  }
                  label="Generate Cover Letter"
                  sx={{ mb: 2 }}
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading || (!jobDescription && !jobDescriptionUrl)}
                  startIcon={loading ? <CircularProgress size={20} /> : <EditIcon />}
                >
                  {loading ? 'Processing...' : 'Refine Resume'}
                </Button>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Match Score
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <LinearProgress
                    variant="determinate"
                    value={matchPercentage}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {`${Math.round(matchPercentage)}% match with job requirements`}
                  </Typography>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Changes Made
                </Typography>
                <List sx={{ mb: 4 }}>
                  {changes.map((change, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={change} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Refined Resume
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  value={refinedResume}
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleDownload('resume')}
                  startIcon={<DownloadIcon />}
                  sx={{ mb: 2, mr: 2 }}
                >
                  Download Refined Resume
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleRestart}
                  startIcon={<RefreshIcon />}
                  sx={{ mb: 2 }}
                >
                  Start New Refinement
                </Button>

                {coverLetter && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom>
                      Cover Letter
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={8}
                      value={coverLetter}
                      InputProps={{ readOnly: true }}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleDownload('cover')}
                      startIcon={<DownloadIcon />}
                    >
                      Download Cover Letter
                    </Button>
                  </>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RefineResumePage; 
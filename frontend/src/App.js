import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RefineResumePage from './pages/RefineResumePage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/refine-resume" element={<RefineResumePage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
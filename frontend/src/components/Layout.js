import React from 'react';
import { Box, Container } from '@mui/material';
import GalaxyBackground from './GalaxyBackground';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <GalaxyBackground />
      <Container
        component={motion.main}
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 
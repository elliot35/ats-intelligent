import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
          }}
        >
          ATS Intelligent
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/refine-resume"
          >
            Refine Resume
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/interview-prep"
          >
            Interview Prep
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
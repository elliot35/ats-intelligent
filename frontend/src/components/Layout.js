import React from 'react';
import { Box, Typography } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[50],
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          Made with{' '}
          <FavoriteIcon
            sx={{
              color: 'error.main',
              fontSize: '1rem',
              verticalAlign: 'middle',
            }}
          />{' '}
          by Elliot He
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout; 
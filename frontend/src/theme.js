import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
      light: '#5effff',
      dark: '#00b2cc',
      contrastText: '#000',
    },
    secondary: {
      main: '#e91e63',
      light: '#ff6090',
      dark: '#b0003a',
      contrastText: '#fff',
    },
    background: {
      default: '#0b0033',
      paper: 'rgba(26, 26, 64, 0.8)',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Orbitron", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #00e5ff 30%, #e91e63 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00e5ff 30%, #2979ff 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00b2cc 30%, #2962ff 90%)',
          },
        },
        outlined: {
          borderColor: '#00e5ff',
          '&:hover': {
            borderColor: '#5effff',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: '#00e5ff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00e5ff',
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.2)',
            },
          },
        },
      },
    },
  },
});

export default theme; 
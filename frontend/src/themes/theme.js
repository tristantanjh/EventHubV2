import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a0a0a',
    },
    secondary: {
      main: '#faf4f0', 
    },
    tertiary: {
        main: '#154ebf', 
    },
    background: {
        default: '#faf4f0', 
        secondary: '#EC3932',
        tertiary: '#F7772C',
    },
  },
  typography: {
    fontFamily: 'Reddit Mono, sans-serif', 
  },


});

export default theme;
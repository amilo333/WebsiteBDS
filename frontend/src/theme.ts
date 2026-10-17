import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1559c7', dark: '#0f419b', light: '#0bb9d4' },
    text: { primary: '#26354a', secondary: '#69758a' },
    background: { default: '#ffffff', paper: '#ffffff' },
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Arial, sans-serif',
    body1: { fontWeight: 500 },
    body2: { fontWeight: 500 },
    h1: {
      fontSize: '1.65rem',
      lineHeight: 1.2,
      fontWeight: 800,
      color: '#174da6',
    },
    h2: {
      fontSize: '1.4rem',
      lineHeight: 1.25,
      fontWeight: 800,
      color: '#174da6',
    },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiButtonBase: {
      styleOverrides: {
        root: { fontFamily: 'Inter, "Segoe UI", Roboto, Arial, sans-serif', fontWeight: 600 },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { fontFamily: 'Inter, "Segoe UI", Roboto, Arial, sans-serif', fontWeight: 600 },
      },
    },
    MuiContainer: { defaultProps: { maxWidth: 'lg' } },
  },
})

import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFD166',
    accentDark: '#FFB800',
    background: {
      gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      light: '#f5f7fa',
      dark: '#c3cfe2',
    },
    text: {
      primary: '#2d3436',
      secondary: '#ffffff',
      accent: '#FF6B6B',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    large: '1200px',
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
}; 
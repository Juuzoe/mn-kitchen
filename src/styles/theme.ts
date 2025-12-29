const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: {
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
      light: '#FFFFFF',
      dark: '#2C3E50'
    },
    text: {
      primary: '#2C3E50',
      secondary: '#FFFFFF',
      accent: '#FF6B6B'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem'
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    large: '1200px'
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.2s ease-in-out'
  }
};

export default theme; 
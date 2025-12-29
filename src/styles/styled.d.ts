import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      accentDark: string;
      background: {
        gradient: string;
        light: string;
        dark: string;
      };
      text: {
        primary: string;
        secondary: string;
        accent: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      large: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
  }
} 
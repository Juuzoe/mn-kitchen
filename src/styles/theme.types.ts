export interface ThemeColors {
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
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  large: string;
}

export interface ThemeTransitions {
  default: string;
  fast: string;
  slow: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
  transitions: ThemeTransitions;
} 
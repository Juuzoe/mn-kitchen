import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* iOS momentum scrolling */
    -webkit-overflow-scrolling: touch;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.colors.background.light};
    color: ${({ theme }) => theme.colors.text.primary};
    /* Prevent pull-to-refresh on iOS */
    overscroll-behavior-y: none;
    /* Safe area for iPhone X and newer */
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  }

  /* Prevent text selection on drag */
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }

  /* Better scrolling on iOS */
  * {
    -webkit-overflow-scrolling: touch;
  }

  /* Prevent zoom on double tap */
  button, a {
    touch-action: manipulation;
  }
`;

export default GlobalStyle; 
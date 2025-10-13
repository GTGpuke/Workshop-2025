// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import { Colors, Fonts } from '../constants/theme';
// Importez ici les fichiers de polices via @font-face (les fichiers sont dans /public/assets/fonts)

export const GlobalStyle = createGlobalStyle`
  // --- Police Loading (Hypothétique) ---
  /* @font-face {
    font-family: 'Cinzel-Bold';
    src: url('/assets/fonts/Cinzel-Bold.ttf') format('truetype');
  }
  */

  // --- Reset et Styles Globaux ---
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${Colors.primary}; /* Le fond Profond Nuit */
    color: ${Colors.textPrimary};
    font-family: ${Fonts.body}, sans-serif;
    line-height: 1.6;
    scroll-behavior: smooth;
  }

  h1, h2, h3 {
    font-family: ${Fonts.header}, serif;
    color: ${Colors.accent};
  }
`;
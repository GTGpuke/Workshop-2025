// src/constants/theme.js
import { css } from 'styled-components';

// 1. Déclinaisons de Couleurs
export const Colors = {
  primary: '#1A237E',      // Profond Nuit (Fond principal)
  secondary: '#5E35B1',    // Pourpre Royal (CTA)
  accent: '#FFD700',       // Or Flamboyant (Hovers/Lueurs)
  textPrimary: '#EBEBEB',  // Blanc Parchemin
  textSecondary: '#9E9E9E',// Gris Pierre
  backgroundCard: '#2C3E50', // Fond pour les cartes
};

// 2. Polices (Les noms doivent correspondre aux fichiers chargés)
export const Fonts = {
  header: 'Cinzel-Bold',
  body: 'Poppins-Regular',
};

// 3. Breakpoints (Clés de la responsivité)
const sizes = {
  tablet: 768,
  desktop: 1024,
};

// Utilitaire de Media Queries pour Styled-Components
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
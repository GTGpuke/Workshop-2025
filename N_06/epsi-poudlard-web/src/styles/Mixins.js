// src/styles/Mixins.js
import { css } from 'styled-components';
import { Colors } from '../constants/theme';

export const LueurMixin = css`
  border: 1px solid ${Colors.accent};
  box-shadow: 0 0 10px ${Colors.accent}; /* La lueur or */
  transform: translateY(-2px); /* Légère élévation */
`;
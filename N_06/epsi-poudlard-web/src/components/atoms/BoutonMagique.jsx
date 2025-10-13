// src/components/atoms/BoutonMagique.jsx
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../constants/theme';
import { LueurMixin } from '../../styles/Mixins';

const StyledButton = styled.button`
  background-color: ${Colors.secondary};
  color: ${Colors.textPrimary};
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 1.1em;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background-color: #4527A0; /* Plus foncé */
    color: ${Colors.accent};
    ${LueurMixin}
  }

  &:disabled {
    background-color: ${Colors.textSecondary};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const BoutonMagique = ({ title, onClick, disabled = false }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {title}
    </StyledButton>
  );
};

export default BoutonMagique;
// src/components/molecules/CardSorts.jsx

import React from 'react';
import styled from 'styled-components';
import { Colors, media } from '../../constants/theme';
import { LueurMixin } from '../../styles/Mixins';
// AJOUTEZ CETTE LIGNE :
import BoutonMagique from '../atoms/BoutonMagique'; // L'importation manquante !

const CardContainer = styled.div`
  background-color: ${Colors.backgroundCard};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    ${LueurMixin}
  }

  h3 {
    color: ${Colors.accent};
    font-size: 1.5em;
    margin-bottom: 5px;
  }

  p.sort-name {
    color: ${Colors.secondary};
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const CardSorts = ({ data }) => {
  return (
    <CardContainer>
      {/* Remplacer par un composant d'icône plus tard */}
      <p>🔮</p> 
      <h3>{data.titre}</h3>
      <p className="sort-name">Sort associé : {data.sort}</p>
      <p>{data.description}</p>
      
      {/* Ligne 41 : BoutonMagique est maintenant défini ! */}
      <BoutonMagique title="Voir le Grimoire" onClick={() => console.log(`Détails du sort : ${data.titre}`)} />
    </CardContainer>
  );
};

export default CardSorts;
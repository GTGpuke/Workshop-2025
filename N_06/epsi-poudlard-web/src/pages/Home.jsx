// src/pages/Home.jsx
import React from 'react';
import styled from 'styled-components';
import { media } from '../constants/theme';
import { FORMATIONS_SORT } from '../constants/formations';
// Import des composants
import HeaderPoudlard from '../components/molecules/HeaderPoudlard'; // À créer
import BoutonMagique from '../components/atoms/BoutonMagique';
import CardSorts from '../components/molecules/CardSorts';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const FormationsGrid = styled.div`
  display: flex;
  flex-direction: column; /* Mobile first: empilement */

  ${media.tablet`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  `}

  /* Gestion des colonnes Desktop */
  ${media.desktop`
    & > * {
        width: calc(33.33% - 15px); 
    }
  `}
`;

const Home = () => {
  return (
    <PageContainer>
      {/* On utilisera un HeaderPoudlard qui gère le menu burger sur mobile */}
      {/* <HeaderPoudlard /> */} 
      
      {/* Section Hero / Bannière Grand Hall */}
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1>EPSI Poudlard : Forgés par la magie du code</h1>
        <p style={{ margin: '20px 0', fontSize: '1.2em' }}>
          Devenez l'Auror du numérique de demain.
        </p>
        <BoutonMagique title="Recevoir la Lettre d'Admission" onClick={() => alert('Par hibou !')} />
      </div>

      {/* Section Formations */}
      <h2>🕯️ Nos Sorts & Potions 🕯️</h2>
      <FormationsGrid>
        {FORMATIONS_SORT.map((formation) => (
          <CardSorts key={formation.id} data={formation} />
        ))}
      </FormationsGrid>

      {/* Footer / Section Contact, etc. */}
    </PageContainer>
  );
};

export default Home;
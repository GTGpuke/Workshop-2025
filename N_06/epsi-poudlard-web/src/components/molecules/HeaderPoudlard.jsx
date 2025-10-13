// src/components/molecules/HeaderPoudlard.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Colors, media, Fonts } from '../../constants/theme';
import { FaBars, FaTimes } from 'react-icons/fa'; // Pictogrammes Burger/Fermer

const NavItems = [
    { name: 'Formations', href: '#formations' }, // Les Sorts
    { name: 'Admissions', href: '#admissions' }, // La Lettre
    { name: 'Actualités', href: '#news' },       // La Gazette
    { name: 'Campus', href: '#campus' },         // La Carte du Maraudeur
];

// 1. Styles du Header (Fixe et Thématique)
const StyledHeader = styled.header`
  background-color: ${Colors.primary};
  padding: 15px 30px;
  position: sticky; /* Fixe en haut de page */
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${Colors.secondary};
`;

const Logo = styled.h1`
  font-family: ${Fonts.header};
  color: ${Colors.accent};
  font-size: 1.8em;
  /* (Ajouter un logo SVG Poudlard-EPSI ici) */
`;

// 2. Navigation Desktop
const DesktopNav = styled.nav`
  display: none;

  ${media.desktop`
    display: block;
  `}

  a {
    color: ${Colors.textPrimary};
    text-decoration: none;
    margin-left: 25px;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${Colors.accent}; /* Lueur Or au survol */
    }
  }
`;

// 3. Bouton Burger (Mobile)
const MobileIcon = styled.div`
  display: block;
  font-size: 1.5em;
  color: ${Colors.accent};
  cursor: pointer;

  ${media.desktop`
    display: none;
  `}
`;

// 4. Menu Mobile (Modal/Voile)
const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(26, 35, 126, 0.95); /* Profond Nuit semi-transparent */
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  
  /* Animation slide-in depuis la droite */
  transform: translateX(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;

  a {
    color: ${Colors.textPrimary};
    font-size: 2em;
    padding: 15px 0;
    text-decoration: none;
    &:hover {
      color: ${Colors.accent};
    }
  }
`;


const HeaderPoudlard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledHeader>
            <Logo>EPSI Poudlard</Logo>

            {/* Navigation Desktop */}
            <DesktopNav>
                {NavItems.map(item => (
                    <a key={item.name} href={item.href}>{item.name}</a>
                ))}
            </DesktopNav>

            {/* Icône Mobile */}
            <MobileIcon onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </MobileIcon>

            {/* Menu Mobile */}
            <MobileMenu isOpen={isOpen}>
                {NavItems.map(item => (
                    <a key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        {item.name}
                    </a>
                ))}
            </MobileMenu>
        </StyledHeader>
    );
};

export default HeaderPoudlard;
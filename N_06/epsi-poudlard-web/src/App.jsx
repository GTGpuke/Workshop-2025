// src/App.jsx
import React from 'react';
import { GlobalStyle } from './styles/GlobalStyles';
import Home from './pages/Home';

function App() {
  return (
    <>
      <GlobalStyle />
      {/* Ici, on pourrait ajouter un Router si on avait plusieurs pages */}
      <Home /> 
    </>
  );
}

export default App;
// src/index.js (Contenu standard React)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Ici, l'application est injectée dans le div ID="root" du fichier public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
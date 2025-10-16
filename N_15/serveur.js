// Importation des dépendances nécessaires
const express = require('express');
const { google } = require('googleapis');
const session = require('express-session');
require('dotenv').config(); // Pour charger les variables d'environnement depuis un fichier .env

// --- Configuration ---
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de la session pour stocker les tokens
app.use(session({
    secret: process.env.SESSION_SECRET, // Une chaîne de caractères aléatoire pour sécuriser la session
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettre `true` en production avec HTTPS
}));

// Création du client OAuth2 pour Google
// Les credentials doivent être récupérés depuis la console Google Cloud
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI // ex: http://localhost:3000/auth/google/callback
);

// --- Middleware de vérification d'authentification ---
// Ce middleware protégera nos routes API.
const isAuthenticated = (req, res, next) => {
    if (req.session.tokens) {
        // Si les tokens sont dans la session, l'utilisateur est authentifié
        oauth2Client.setCredentials(req.session.tokens);
        // Ajoutons le client OAuth configuré à l'objet `req` pour un accès facile dans les routes
        req.googleClient = oauth2Client;
        next();
    } else {
        // Sinon, renvoyer une erreur 401 (Non autorisé)
        res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter.' });
    }
};

// --- Routes d'Authentification ---

// 1. Redirection vers la page de consentement Google
app.get('/auth/google', (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/gmail.readonly', // Lire les emails
        'https://www.googleapis.com/auth/calendar.readonly' // Lire les événements du calendrier
    ];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // 'offline' pour obtenir un refresh_token
        scope: scopes
    });
    res.redirect(url);
});

// 2. Callback après le consentement de l'utilisateur
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        // Échange du code d'autorisation contre des tokens d'accès
        const { tokens } = await oauth2Client.getToken(code);
        req.session.tokens = tokens; // Stockage des tokens dans la session
        res.redirect('/'); // Redirection vers la page d'accueil
    } catch (error) {
        console.error('Erreur lors de la récupération des tokens:', error);
        res.status(500).send('Une erreur est survenue lors de l`authentification.');
    }
});

// 3. Déconnexion
app.get('/auth/logout', (req, res) => {
    req.session.destroy(); // Destruction de la session
    res.redirect('/');
});


// --- Routes API Protégées ---

// Route pour récupérer les informations de l'utilisateur connecté
app.get('/api/profile', isAuthenticated, async (req, res) => {
    try {
        const oauth2 = google.oauth2({
            auth: req.googleClient,
            version: 'v2'
        });
        const { data } = await oauth2.userinfo.get();
        res.json(data);
    } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        res.status(500).json({ error: "Impossible de récupérer les informations du profil." });
    }
});

// Route pour récupérer les 5 derniers emails
app.get('/api/emails', isAuthenticated, async (req, res) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth: req.googleClient });
        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 5,
            q: 'is:inbox'
        });

        const messages = response.data.messages || [];
        if (messages.length === 0) {
            return res.json([]);
        }

        const emailDetails = await Promise.all(
            messages.map(async (message) => {
                const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
                const headers = msg.data.payload.headers;
                const subject = headers.find(h => h.name === 'Subject')?.value || 'Sans objet';
                const from = headers.find(h => h.name === 'From')?.value || 'Inconnu';
                return { id: message.id, subject, from };
            })
        );

        res.json(emailDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des emails:', error);
        res.status(500).json({ error: 'Impossible de récupérer les emails.' });
    }
});

// Route pour récupérer les 5 prochains événements du calendrier
app.get('/api/calendar-events', isAuthenticated, async (req, res) => {
    try {
        const calendar = google.calendar({ version: 'v3', auth: req.googleClient });
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 5,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items.map(event => ({
            summary: event.summary,
            start: event.start.dateTime || event.start.date,
        }));
        res.json(events);
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        res.status(500).json({ error: 'Impossible de récupérer les événements du calendrier.' });
    }
});


// --- Service du fichier statique ---
// Sert le fichier `index.html` comme page principale
app.use(express.static('public')); // Créez un dossier `public` et mettez `index.html` dedans, ou servez-le directement.
// Pour la simplicité de cet exemple, nous allons servir le fichier à la racine.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Le serveur de l'apprenti sorcier écoute sur le port ${PORT}`);
    console.log(`URL de redirection OAuth2.0 à configurer : http://localhost:${PORT}/auth/google/callback`);
});

// Exportation de l'application pour les tests
module.exports = app;
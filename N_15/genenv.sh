#!/bin/bash

# Ce script génère le fichier .env pour le projet "Portail de l'Apprenti Sorcier".
# Il demande les informations nécessaires et crée le fichier dans le répertoire courant.

echo "--- Configuration du fichier .env pour le Portail Sorcier ---"
echo ""

# Demander l'ID Client Google
read -p "Veuillez coller votre Google Client ID : " GOOGLE_CLIENT_ID

# Demander le Secret Client Google
read -p "Veuillez coller votre Google Client Secret : " GOOGLE_CLIENT_SECRET

echo ""
echo "Génération d'un secret de session sécurisé..."
# Générer un secret de session aléatoire avec OpenSSL
SESSION_SECRET=$(openssl rand -base64 32)

# Définir l'URI de redirection qui est fixe pour ce projet
GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/callback"

# Créer le fichier .env avec les informations collectées
cat << EOF > .env
# Fichier de configuration généré automatiquement pour le Portail Sorcier

# Identifiants fournis par la console Google Cloud
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

# L'URI de redirection doit correspondre à la configuration sur Google Cloud
GOOGLE_REDIRECT_URI=${GOOGLE_REDIRECT_URI}

# Secret pour la session (généré aléatoirement)
SESSION_SECRET=${SESSION_SECRET}
EOF

echo ""
echo "✅ Le fichier .env a été créé avec succès !"
echo "Vous pouvez maintenant lancer votre serveur."
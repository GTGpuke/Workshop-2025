#!/bin/bash
BACKUP_DIR="/opt/dockerwarts/backups"
PROJECT_DIR="/opt/dockerwarts"
TIMESTAMP=$(date +"%Y%m%d_%H%M")

mkdir -p ${BACKUP_DIR}

# Arrête les conteneurs pour garantir la cohérence des données
cd ${PROJECT_DIR} && docker-compose down

# Crée l'archive des volumes (le dossier du projet contient docker-compose.yml ET les volumes)
tar -czf ${BACKUP_DIR}/dockerwarts_backup_${TIMESTAMP}.tar.gz ${PROJECT_DIR}

# Redémarre les conteneurs
cd ${PROJECT_DIR} && docker-compose up -d

# Nettoie les backups de plus de 7 jours
find ${BACKUP_DIR} -type f -name "*.tar.gz" -mtime +7 -delete

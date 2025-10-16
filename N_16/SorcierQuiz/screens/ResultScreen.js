// screens/ResultScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { sorcierTypes } from '../data/questions';

// Fonction pour déterminer le type dominant et gérer les cas spéciaux
const getSorcierType = (scores) => {
  let highestScore = -1;
  let dominantTypeKeys = []; // Pour stocker les clés en cas d'égalité

  // 1. Trouver le score le plus élevé
  for (const typeKey in scores) {
    if (scores[typeKey] > highestScore) {
      highestScore = scores[typeKey];
      dominantTypeKeys = [typeKey]; // Nouveau score max, on réinitialise
    } else if (scores[typeKey] === highestScore) {
      dominantTypeKeys.push(typeKey); // Égalité, on ajoute la clé
    }
  }
  
  // Le score maximum possible est 20 questions * 3 points = 60
  const MAITRISE_THRESHOLD = 45; // 75% du maximum possible (Bonus)

  // 2. Gestion des Chemins de Résultat
  
  // Chemin 3 : Maîtrise Parfaite (Score très élevé)
  if (dominantTypeKeys.length === 1 && highestScore >= MAITRISE_THRESHOLD) {
      const type = sorcierTypes[dominantTypeKeys[0]];
      return { 
          name: `ARCHIMAGE ${type.name.toUpperCase()}`, 
          description: `Votre affinité pour la magie ${type.name} est absolue. Vous avez atteint un niveau de Maîtrise Exceptionnelle.`,
          color: '#FF4500' // Couleur de la maîtrise
      };
  }

  // Chemin 2 : Égalité (Sorcier Hybride)
  if (dominantTypeKeys.length > 1) {
    const names = dominantTypeKeys.map(key => sorcierTypes[key].name);
    return { 
        name: `Sorcier Hybride : ${names.join(' & ')}`, 
        description: "Votre magie est un mélange puissant de plusieurs forces. Un potentiel exceptionnel et complexe.",
        color: '#AEEEEE' // Couleur hybride
    };
  }

  // Chemin 1 : Majorité Simple
  const type = sorcierTypes[dominantTypeKeys[0]];
  return { 
      name: type.name, 
      description: type.description,
      color: '#FFD700' // Couleur standard
  };
};

export default function ResultScreen({ route, navigation }) {
  const { finalScores } = route.params;
  const result = getSorcierType(finalScores);
  
  const scoreDetails = Object.keys(finalScores).map(key => ({
    name: sorcierTypes[key].name,
    score: finalScores[key]
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Félicitations, sorcier(ère) !</Text>
      
      <Text style={[styles.resultTitle, { color: result.color || '#FFD700' }]}>
        Tu es un **{result.name}**
      </Text>
      
      <Text style={styles.descriptionText}>
        {result.description}
      </Text>
      
      {/* Affichage des détails des scores */}
      <View style={styles.scoreDetailContainer}>
        <Text style={styles.scoreTitle}>Détails des Scores (Max 60 points) :</Text>
        {scoreDetails.map((detail, index) => (
            <Text key={index} style={styles.scoreText}>
                {detail.name} : {detail.score} points
            </Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.restartButton}
        onPress={() => navigation.popToTop()} // Retour à l'écran principal pour recommencer
      >
        <Text style={styles.restartButtonText}>Recommencer le Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles (même que précédemment)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0F0F0F', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#9C27B0', marginBottom: 20, textAlign: 'center' },
  resultTitle: { fontSize: 32, fontWeight: '900', marginVertical: 15, textAlign: 'center' },
  descriptionText: { fontSize: 18, color: '#CCCCCC', textAlign: 'center', marginBottom: 40, paddingHorizontal: 10 },
  scoreDetailContainer: { backgroundColor: '#222', padding: 15, borderRadius: 10, marginBottom: 30, width: '100%', maxWidth: 350 },
  scoreTitle: { fontSize: 16, fontWeight: 'bold', color: '#AEEEEE', marginBottom: 5 },
  scoreText: { color: '#EEE', fontSize: 14, textAlign: 'left' },
  restartButton: { backgroundColor: '#9C27B0', padding: 15, borderRadius: 10, marginTop: 20 },
  restartButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
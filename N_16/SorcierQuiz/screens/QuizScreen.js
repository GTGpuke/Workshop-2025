// screens/QuizScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { questions, initialScores } from '../data/questions'; // Import des données

const { width } = Dimensions.get('window');

export default function QuizScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(initialScores);

  const handleAnswer = (option) => {
    // 1. Mettre à jour les scores
    // Créer une copie du score pour la mise à jour
    const newScores = {
        ...scores,
        [option.score_type]: scores[option.score_type] + option.points,
    };
    setScores(newScores);

    // 2. Passer à la question suivante ou terminer
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // FIN DU QUIZ : naviguer vers le résultat en passant le score final (mis à jour)
      navigation.replace('Result', { finalScores: newScores });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        Question {currentQuestionIndex + 1} / {questions.length}
      </Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {currentQuestion?.question}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion?.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Styles (à adapter si nécessaire)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E' },
  progressText: { color: '#FFD700', fontSize: 16, textAlign: 'center', marginBottom: 10, fontStyle: 'italic' },
  questionContainer: { padding: 20, backgroundColor: '#333333', borderRadius: 10, marginBottom: 30, minHeight: 100, justifyContent: 'center' },
  questionText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  optionsContainer: { flexDirection: 'column' },
  optionButton: {
    backgroundColor: '#444444',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
  },
  optionText: { color: '#CCCCCC', fontSize: 16, textAlign: 'center' },
});
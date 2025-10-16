// screens/QuizScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { questions, initialScores } from '../data/questions'; // Import des données

const { width } = Dimensions.get('window');

export default function QuizScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  // store user's answers per question so they can go back and change them
  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));

  // Fisher-Yates shuffle - returns a new array
  const shuffleArray = (arr) => {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Shuffle options once whenever the question changes. We copy objects to
  // avoid mutating the original data in `questions` and attach originalIndex
  useEffect(() => {
    if (!currentQuestion?.options) {
      setShuffledOptions([]);
      return;
    }

    const optsCopy = currentQuestion.options.map((o, idx) => ({ ...o, originalIndex: idx }));
    setShuffledOptions(shuffleArray(optsCopy));
  }, [currentQuestionIndex]);

  const handleAnswer = (option) => {
    // Save answer for current question (store score_type, points and originalIndex)
    const answersCopy = answers.slice();
    answersCopy[currentQuestionIndex] = {
      score_type: option.score_type,
      points: option.points,
      originalIndex: option.originalIndex,
    };
    setAnswers(answersCopy);

    // Recompute scores from answers array to keep totals consistent when going back/forward
    const recomputed = { ...initialScores };
    answersCopy.forEach(a => {
      if (a) {
        recomputed[a.score_type] = (recomputed[a.score_type] || 0) + a.points;
      }
    });
    setScores(recomputed);

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      navigation.replace('Result', { finalScores: recomputed });
    }
  };

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
        {shuffledOptions.map((option, index) => {
          const selected = answers[currentQuestionIndex]?.originalIndex === option.originalIndex;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, selected ? styles.optionButtonSelected : null]}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.navContainer}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
          >
            <Text style={styles.prevText}>Précédent</Text>
          </TouchableOpacity>
        )}
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
  optionButtonSelected: {
    backgroundColor: '#556BFF',
  },
  optionText: { color: '#CCCCCC', fontSize: 16, textAlign: 'center' },
  navContainer: { marginTop: 12, alignItems: 'center' },
  prevButton: { backgroundColor: '#555555', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  prevText: { color: '#FFFFFF', fontWeight: '600' },
});
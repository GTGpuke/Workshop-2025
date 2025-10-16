// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

// Écran d'accueil simple pour commencer le quiz
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.homeContainer}>
        <View style={styles.innerHome}>
            <Text style={styles.homeTitle}>“Tu es un sorcier, Harry !”</Text>
            <Text style={styles.homeSubtitle}>Mais lequel ? Découvre ton archétype !</Text>
            <TouchableOpacity 
                style={styles.startButton}
                onPress={() => navigation.navigate('Quiz')}
            >
                <Text style={styles.startText}>Commencer le Quiz</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} // Cache la barre de navigation
        />
        <Stack.Screen 
            name="Quiz" 
            component={QuizScreen} 
            options={{ title: 'Votre Destin Magique', headerStyle: { backgroundColor: '#1E1E1E' }, headerTintColor: '#FFD700' }}
        />
        <Stack.Screen 
            name="Result" 
            component={ResultScreen} 
            options={{ title: 'Ton Résultat', headerStyle: { backgroundColor: '#0F0F0F' }, headerTintColor: '#FFD700' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#0F0F0F',
    },
    innerHome: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    homeTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#9C27B0',
        textAlign: 'center',
        marginBottom: 10,
    },
    homeSubtitle: {
        fontSize: 18,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 50,
    },
    startButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    startText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    }
});
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Image, Dimensions } from 'react-native';

// Chemin des images fournies. Assurez-vous qu'elles se trouvent dans votre dossier 'assets/'.
const snakeFrame1 = require('../assets/Gemini_Generated_Image_omc8lnomc8lnomc8-removebg-preview.png');
const snakeFrame2 = require('../assets/Gemini_Generated_Image_j0dp30j0dp30j0dp-removebg-preview.png');
const snakeFrame3 = require('../assets/Gemini_Generated_Image_7z1bci7z1bci7z1b-removebg-preview.png');
const frames = [snakeFrame1, snakeFrame2, snakeFrame3];

export default function LoadingToQuizScreen({ navigation }) {
    // Animations pour le glow/pulsation et le texte
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeOutAnim = useRef(new Animated.Value(1)).current; // pour fade-out du loader

    // Gestion de l'image animée (sprite sheet)
    const frameIndex = useRef(0);
    const [currentFrame, setCurrentFrame] = useState(frames[0]);

    useEffect(() => {
        // Animation du serpent (changement d'image toutes les 250ms)
        const frameInterval = setInterval(() => {
            frameIndex.current = (frameIndex.current + 1) % frames.length;
            setCurrentFrame(frames[frameIndex.current]);
        }, 250);

        // Animation de pulsation pour la lueur bleue (glow)
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { to: 1.1, duration: 800, useNativeDriver: true }),
                Animated.timing(pulseAnim, { to: 1.0, duration: 800, useNativeDriver: true }),
            ])
        ).start();

        // Animation d'apparition du message
        Animated.timing(fadeAnim, {
            to: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        // Délai de 3 secondes avant de passer au Quiz
        const timer = setTimeout(() => {
            clearInterval(frameInterval);
            // fade out wrapper then navigate
            Animated.timing(fadeOutAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
                navigation.replace('Quiz');
            });
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(frameInterval);
        };
    }, [navigation, pulseAnim, fadeAnim]);

    // Style pour l'effet de lueur magique
    const animatedStyle = {
        transform: [{ scale: pulseAnim }],
        // Removed blue shadow to avoid the blue glow
    };

    // Particles setup (approximation du canvas JS fourni)
    const { width, height } = Dimensions.get('window');
    const numberOfParticles = 60;
    const spawnZone = {
        x: (width / 2) - 125,
        y: (height / 2) - 125,
        w: 250,
        h: 250,
    };
    const [particles] = useState(() => {
        // initialize particle descriptors
        const list = [];
        for (let i = 0; i < numberOfParticles; i++) {
            const px = spawnZone.x + Math.random() * spawnZone.w;
            const py = spawnZone.y + Math.random() * spawnZone.h;
            const size = Math.random() * 3 + 0.8;
            const life = Math.random() * 3000 + 2000; // ms
            list.push({ x: px, y: py, size, life, anim: new Animated.Value(Math.random()) });
        }
        return list;
    });

    useEffect(() => {
        // Start particle loops
        const anims = particles.map((p, idx) => {
            const loop = Animated.loop(
                Animated.sequence([
                    Animated.timing(p.anim, { toValue: 1, duration: p.life / 2, useNativeDriver: true }),
                    Animated.timing(p.anim, { toValue: 0, duration: p.life / 2, useNativeDriver: true }),
                ])
            );
            loop.start();
            return { loop };
        });

        return () => {
            anims.forEach(a => a.loop && a.loop.stop());
        };
    }, [particles]);

    return (
        <Animated.View style={[styles.wrapper, { opacity: fadeOutAnim }] }>
            <SafeAreaView style={styles.loadingContainer}>
                {/* particles layer */}
                <View style={styles.particlesLayer} pointerEvents="none">
                    {particles.map((p, i) => (
                        <Animated.View
                            key={i}
                            style={[
                                styles.particle,
                                {
                                    left: p.x,
                                    top: p.y,
                                    width: p.size,
                                    height: p.size,
                                    opacity: p.anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.9] }),
                                    transform: [{ translateY: p.anim.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }]
                                }
                            ]}
                        />
                    ))}
                </View>

                <Animated.View style={[styles.snakeContainer, animatedStyle]}> 
                    <Image source={currentFrame} style={styles.snakeImage} />
                </Animated.View>
                <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}> 
                    La magie est en cours de compilation...
                </Animated.Text>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#0F0F0F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    snakeContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        transform: [{ translateY: -15 }],
    },
    snakeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    loadingText: {
        fontSize: 18,
        color: '#00BFFF',
        fontWeight: 'bold',
    }
    ,
    wrapper: { flex: 1 },
    particlesLayer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    particle: {
        position: 'absolute',
        backgroundColor: 'rgba(0,191,255,0.6)',
        borderRadius: 8,
        // no shadow to prevent blue glow
    }
});
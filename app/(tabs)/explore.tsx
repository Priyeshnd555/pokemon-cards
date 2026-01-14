/**
 * @file explore.tsx
 * @description Discovery/Swipe screen implementation.
 * WHY:
 * This is the primary engagement engine of the app. It manages the discovery lifecycle
 * of new Pokémon, coordinating between the API service and the global state.
 */

import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { getRandomPokemon } from '@/src/api/pokemon-api';
import { PokemonCard } from '@/src/components/pokemon/pokemon-card';
import { LoadingSpinner } from '@/src/components/ui/loading-spinner';
import { ScreenHeader } from '@/src/components/ui/screen-header';
import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { usePokemonStore } from '@/src/store/pokemon-store';

const { height } = Dimensions.get('window');

export default function SwipeScreen() {
  const currentPokemon = usePokemonStore((state) => state.currentPokemon);
  const setCurrentPokemon = usePokemonStore((state) => state.setCurrentPokemon);
  const addLikedPokemon = usePokemonStore((state) => state.addLikedPokemon);
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tracking for race conditions
  const fetchCount = useRef(0);

  const softBlue = useThemeColor({}, 'softBlue');
  const overlayBg = useThemeColor({
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(0, 0, 0, 0.8)'
  }, 'background');

  const fetchNewPokemon = useCallback(async () => {
    const currentRequestId = ++fetchCount.current;
    
    setLoading(true);
    setError(null);
    
    try {
      const pokemon = await getRandomPokemon();
      if (currentRequestId !== fetchCount.current) return;

      setCurrentPokemon(pokemon);
    } catch (err) {
      if (currentRequestId !== fetchCount.current) return;
      setError('Failed to encounter a Pokémon. Check your connection.');
    } finally {
      if (currentRequestId === fetchCount.current) {
        setTimeout(() => setLoading(false), 300);
      }
    }
  }, [setCurrentPokemon]);

  useEffect(() => {
    if (!currentPokemon) {
      fetchNewPokemon();
    }
  }, [currentPokemon, fetchNewPokemon]);

  const handleLike = useCallback(() => {
    if (!currentPokemon) return;
    addLikedPokemon(currentPokemon);
    fetchNewPokemon();
  }, [currentPokemon, addLikedPokemon, fetchNewPokemon]);

  const handleDislike = useCallback(() => {
    if (!currentPokemon) return;
    fetchNewPokemon();
  }, [currentPokemon, fetchNewPokemon]);

  if (loading && !currentPokemon) {
    return (
      <ThemedView style={styles.centered}>
        <LoadingSpinner />
        <ThemedText style={styles.loadingText}>Searching for wild Pokémon...</ThemedText>
      </ThemedView>
    );
  }

  if (error && !currentPokemon) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity onPress={fetchNewPokemon}>
            <LinearGradient colors={['#007AFF', '#0055D4']} style={styles.retryButton}>
                <ThemedText type="defaultSemiBold" style={styles.retryText}>Retry</ThemedText>
            </LinearGradient>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Discovery" subtitle="Swipe to build your team" />

      <View style={styles.cardContainer}>
        {currentPokemon && (
          <PokemonCard
            pokemon={currentPokemon}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        )}
        
        {loading && currentPokemon && (
           <View style={[styles.overlay, { backgroundColor: overlayBg }]}>
             <LoadingSpinner />
           </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  retryButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryText: {
    color: '#fff',
  },
});

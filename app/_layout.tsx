import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { getPokemonsParallel } from '@/src/api/pokemon-api';
import { usePokemonStore } from '@/src/store/pokemon-store';
import React, { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const theme = usePokemonStore((state) => state.theme);
  const likedPokemonIds = usePokemonStore((state) => state.likedPokemonIds);
  const hydrateLikedPokemons = usePokemonStore((state) => state.hydrateLikedPokemons);

  useEffect(() => {
    // Hydrate full pokemon data for liked IDs on startup
    const hydrate = async () => {
      if (likedPokemonIds.length > 0) {
        try {
          const pokemons = await getPokemonsParallel(likedPokemonIds);
          hydrateLikedPokemons(pokemons);
        } catch (error) {
          console.error('[RootLayout] Failed to hydrate collection:', error);
        }
      }
    };
    hydrate();
  }, [likedPokemonIds.length]); // Only run when IDs change or on initial load

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Settings' }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

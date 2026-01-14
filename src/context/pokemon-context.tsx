/**
 * @file pokemon-context.tsx
 * @description Centralized state management for Pokémon data and user preferences.

 * WHY:
 * This context serves as the single source of truth for the application's "Living State".
 * It decouples data persistence/fetching from the UI layer, enabling high maintainability
 * and predictable behavior across different device states.
 */

import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Pokemon } from '../types/pokemon';

// --- STATE SHAPE ---
interface PokemonContextType {
  /** List of Pokémon the user has liked during this session/lifecycle */
  likedPokemons: Pokemon[];
  /** Transition: Adds a Pokémon to the liked list if not already present */
  addLikedPokemon: (pokemon: Pokemon) => void;
  /** The Pokémon currently being viewed/interacted with in the swipe stack */
  currentPokemon: Pokemon | null;
  /** Transition: Updates the focused Pokémon */
  setCurrentPokemon: (pokemon: Pokemon | null) => void;
  /** Current UI theme (light/dark) */
  theme: 'light' | 'dark';
  /** Transition: Explicitly toggles between light and dark modes */
  toggleTheme: () => void;
}

// --- CONTEXT CREATION ---
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// --- PROVIDER COMPONENT ---
interface PokemonProviderProps {
  children: ReactNode;
}

/**
 * State Transition Flow:
 * Idle -> Fetching (External) -> SetCurrentPokemon -> User Action (Like/Dislike) -> [LikedPokemons Update] -> Refresh
 */
export function PokemonProvider({ children }: PokemonProviderProps) {
  const systemColorScheme = useColorScheme();
  
  // State definitions
  const [likedPokemons, setLikedPokemons] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(systemColorScheme === 'dark' ? 'dark' : 'light');

  // Sync with system theme changes
  useEffect(() => {
    if (systemColorScheme) {
      console.log(`[ThemeEngine] Syncing with system preference: ${systemColorScheme}`);
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  /**
   * Action: addLikedPokemon
   * Constraint: Prevent duplicates to ensure data integrity.
   * Flow: Check existence -> Append to State -> Log Success
   */
  const addLikedPokemon = useCallback((pokemon: Pokemon) => {
    setLikedPokemons(prev => {
      const isDuplicate = prev.some(p => p.id === pokemon.id);
      if (isDuplicate) {
        console.warn(`[StateStore] Attempted to add duplicate Pokémon: ${pokemon.name} (ID: ${pokemon.id})`);
        return prev;
      }
      
      const nextState = [...prev, pokemon];
      console.log(`[StateStore] Successfully liked: ${pokemon.name}. Total Liked: ${nextState.length}`);
      return nextState;
    });
  }, []);

  /**
   * Action: toggleTheme
   * Flow: Current -> Opposite -> Update
   */
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      console.log(`[ThemeEngine] User manually toggled theme to: ${next}`);
      return next;
    });
  }, []);

  const value = {
    likedPokemons,
    addLikedPokemon,
    currentPokemon,
    setCurrentPokemon,
    theme,
    toggleTheme,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}

// --- CUSTOM HOOK ---
export function usePokemon() {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
}

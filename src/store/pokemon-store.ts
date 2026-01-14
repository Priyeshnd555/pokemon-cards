import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Pokemon } from '../types/pokemon';

interface PokemonState {
  likedPokemonIds: number[];
  likedPokemons: Pokemon[]; // hydrated list
  currentPokemon: Pokemon | null;
  theme: 'light' | 'dark';
  
  // Actions
  addLikedPokemon: (pokemon: Pokemon) => void;
  removeLikedPokemon: (id: number) => void;
  setCurrentPokemon: (pokemon: Pokemon | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  hydrateLikedPokemons: (pokemons: Pokemon[]) => void;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set) => ({
      likedPokemonIds: [],
      likedPokemons: [],
      currentPokemon: null,
      theme: 'light',

      addLikedPokemon: (pokemon) => set((state) => {
        if (state.likedPokemonIds.includes(pokemon.id)) return state;
        return {
          likedPokemonIds: [...state.likedPokemonIds, pokemon.id],
          likedPokemons: [...state.likedPokemons, pokemon],
        };
      }),

      removeLikedPokemon: (id) => set((state) => ({
        likedPokemonIds: state.likedPokemonIds.filter(pid => pid !== id),
        likedPokemons: state.likedPokemons.filter(p => p.id !== id),
      })),

      setCurrentPokemon: (pokemon) => set({ currentPokemon: pokemon }),

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),

      hydrateLikedPokemons: (pokemons) => set({ likedPokemons: pokemons }),
    }),
    {
      name: 'pokemon-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        likedPokemonIds: state.likedPokemonIds,
        theme: state.theme 
      }),
    }
  )
);

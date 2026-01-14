// WHY: This file defines the API service layer for interacting with the PokéAPI.
// It abstracts all data fetching and URL construction away from the UI,
// providing a clear and reusable contract for retrieving Pokémon data.
// This separation of concerns makes the application more modular, testable, and maintainable.

import { Pokemon } from '../types/pokemon';

// --- CONSTANTS ---
// Centralizing the base URL makes it easy to update if the API endpoint changes.
const API_BASE_URL = 'https://pokeapi.co/api/v2';
const MAX_POKEMON_ID = 1025; // As of Gen 9, there are 1025 Pokémon.

// --- CACHE ---
// In-memory cache to prevent redundant network requests.
const pokemonCache = new Map<number, Pokemon>();

// --- API FUNCTIONS ---

/**
 * Fetches a single Pokémon by its national Pokédex ID.
 *
 * @param id The Pokédex ID of the Pokémon to fetch.
 * @returns A Promise that resolves to a Pokemon object.
 * @throws Will throw an error if the network request fails.
 */
export async function getPokemon(id: number): Promise<Pokemon> {
  // Check cache first
  if (pokemonCache.has(id)) {
    return pokemonCache.get(id)!;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID ${id}. Status: ${response.status}`);
    }
    const data = await response.json();
    
    // Store in cache
    pokemonCache.set(id, data as Pokemon);
    
    return data as Pokemon;
  } catch (error) {
    console.error(`[PokemonAPI] Error fetching Pokémon ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches multiple Pokémon in parallel.
 * Useful for hydrating lists like "Liked" Pokémon.
 *
 * @param ids Array of Pokédex IDs to fetch.
 * @returns A Promise that resolves to an array of Pokemon objects.
 */
export async function getPokemonsParallel(ids: number[]): Promise<Pokemon[]> {
  try {
    const promises = ids.map(id => getPokemon(id));
    return await Promise.all(promises);
  } catch (error) {
    console.error('[PokemonAPI] Error in parallel fetch:', error);
    throw error;
  }
}

/**
 * Fetches a random Pokémon.
 */
export async function getRandomPokemon(): Promise<Pokemon> {
  const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
  return getPokemon(randomId);
}

// END WHY
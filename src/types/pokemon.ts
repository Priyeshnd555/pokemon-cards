// WHY: This file defines the core TypeScript interfaces for the application's data models.
// It establishes a clear data contract for Pokemon, their abilities, types, and user preferences,
// ensuring type safety and consistency across the application, from API integration to UI components.

/**
 * @interface NamedAPIResource
 * Represents a resource with a name and a URL, commonly used in the PokéAPI.
 */
export interface NamedAPIResource {
  name: string;
  url: string;
}

/**
 * @interface PokemonType
 * Represents a Pokémon's type, including the type details.
 */
export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

/**
 * @interface PokemonAbility
 * Represents a Pokémon's ability, including the ability details.
 */
export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

/**
 * @interface PokemonSpritesDreamWorld
 * Contains the SVG URL for a Pokémon's sprite from the dream world.
 */
export interface PokemonSpritesDreamWorld {
  front_default: string; // URL to the SVG sprite
}

/**
 * @interface PokemonSpritesOther
 * Contains various other sprite formats, including dream world.
 */
export interface PokemonSpritesOther {
  dream_world: PokemonSpritesDreamWorld;
}

/**
 * @interface PokemonSprites
 * Contains all sprite URLs for a Pokémon.
 */
export interface PokemonSprites {
  other: PokemonSpritesOther;
}

/**
 * @interface PokemonStat
 * Represents a Pokémon's base stat.
 */
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

/**
 * @interface Pokemon
 * Represents a Pokémon with its key details from the PokéAPI.
 * This interface defines the structure of a Pokémon object that will be used throughout the application.
 */
export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  height: number;
  weight: number;
}

/**
 * @interface UserPreferences
 * Represents user-specific preferences, such as liked Pokémon or theme settings.
 */
export interface UserPreferences {
  likedPokemonIds: number[]; // Array of IDs of Pokémon the user has liked
  theme: "light" | "dark"; // User's preferred theme
}

// END WHY

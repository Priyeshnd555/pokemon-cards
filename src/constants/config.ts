/**
 * @file config.ts
 * @description Centralized configuration hub for the PokeSwipe application.
 * WHY:
 * Centralizing configuration prevents "magic values" from being scattered across the codebase.
 * It allows for easier environment switching (dev/staging/prod) and improves maintainability.
 */

import Constants from 'expo-constants';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export interface AppConfig {
  env: Environment;
  apiUrl: string;
  imageStorageUrl: string;
  apiVersion: string;
  cacheExpirationMs: number;
}

const ENV = (Constants.expoConfig?.extra?.env as Environment) || Environment.Development;

const CONFIG: Record<Environment, AppConfig> = {
  [Environment.Development]: {
    env: Environment.Development,
    apiUrl: 'https://pokeapi.co/api/v2',
    imageStorageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world',
    apiVersion: 'v2',
    cacheExpirationMs: 1000 * 60 * 5, // 5 minutes
  },
  [Environment.Staging]: {
    env: Environment.Staging,
    apiUrl: 'https://staging.pokeapi.co/api/v2',
    imageStorageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world',
    apiVersion: 'v2',
    cacheExpirationMs: 1000 * 60 * 30, // 30 minutes
  },
  [Environment.Production]: {
    env: Environment.Production,
    apiUrl: 'https://pokeapi.co/api/v2',
    imageStorageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world',
    apiVersion: 'v2',
    cacheExpirationMs: 1000 * 60 * 60 * 24, // 24 hours
  },
};

export default CONFIG[ENV];

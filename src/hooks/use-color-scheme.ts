import { usePokemonStore } from '@/src/store/pokemon-store';

export function useColorScheme() {
  return usePokemonStore((state) => state.theme);
}

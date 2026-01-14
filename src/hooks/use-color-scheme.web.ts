// WHY: Web-specific implementation of the theme hook.
// It handles hydration state to avoid server-side rendering mismatches.
import { usePokemon } from '@/src/context/pokemon-context';
import { useEffect, useState } from 'react';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const { theme } = usePokemon();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (hasHydrated) {
    return theme;
  }

  return 'light';
}

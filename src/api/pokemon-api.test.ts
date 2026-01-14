import { getPokemon, getRandomPokemon } from './pokemon-api';

// Mocking fetch
global.fetch = jest.fn();

describe('Pokemon API Service', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches a pokemon by id successfully', async () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: { other: { dream_world: { front_default: 'url' } } },
      abilities: [],
      types: [],
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockPokemon,
    });

    const result = await getPokemon(1);
    
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
    expect(result).toEqual(mockPokemon);
  });

  it('throws an error when fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(getPokemon(9999)).rejects.toThrow('Failed to fetch Pokémon with ID 9999');
  });

  it('fetches a random pokemon', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 5, name: 'charmeleon', sprites: { other: { dream_world: { front_default: 'url' } } }, abilities: [], types: [] }),
    });

    const result = await getRandomPokemon();
    expect(result.id).toBe(5);
    expect(fetch).toHaveBeenCalled();
  });
});

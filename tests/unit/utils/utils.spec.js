import getPokemonOptions, { getPokemonsWithNames } from '@/utils/utils';

describe('Utils', () => {
    test('Debe retornar un arreglo con 4 pokemons', async () => {
        const pokemons = await getPokemonsWithNames([1, 2, 3, 4])
        const names = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander']

        pokemons.forEach((p, i) => {
            expect(p.name).toEqual(names.at(i));
        })
    })

    test('Debe retornar un arreglo con 4 pokemons aleatorios', async () => {
        const pokemonsOptions = await getPokemonOptions()

        expect(pokemonsOptions).toBeDefined()
        expect(pokemonsOptions.length).toEqual(4)

        pokemonsOptions.forEach(pokemon => {
            expect(pokemon).toHaveProperty('id')
            expect(pokemon).toHaveProperty('name')

            expect(pokemon).toEqual({
                name: expect.any(String),
                id: expect.any(Number)
            })
        })
    })
})
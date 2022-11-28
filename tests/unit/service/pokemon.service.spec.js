import { pokemonApi } from "@/service/pokemon.service"

describe('PokemonService', () => {
    test('Detener la url del Api de pokemon configurado.', () => {
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon/')
    })
})
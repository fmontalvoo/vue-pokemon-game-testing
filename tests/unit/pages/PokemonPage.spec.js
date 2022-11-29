import { shallowMount, mount } from '@vue/test-utils'

import PokemonPage from '@/pages/PokemonPage.vue'

describe('PokemonPage', () => {
    let wrapper;
    const pokemons = [
        { id: 1, name: 'bulbasaur' },
        { id: 4, name: 'charmander' },
        { id: 7, name: 'squirtle' },
        { id: 25, name: 'pikachu' },
    ];

    test('Debe llamar al metodo getPokemos() al instanciar el componente', () => {
        const getPokemosSpy = jest.spyOn(PokemonPage.methods, 'getPokemos')
        const wrapper = shallowMount(PokemonPage)

        expect(getPokemosSpy).toHaveBeenCalled()
    })

    test('Debe hacer match con el snapshot al cargar la informacion', () => {
        wrapper = mount(PokemonPage, {
            data() {
                return {
                    pokemons: pokemons,
                    pokemon: pokemons[2],
                    showPokemon: false,
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe mostrar los componentes hijos', () => {
        wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemons: pokemons,
                    pokemon: pokemons[2],
                    showPokemon: false,
                }
            }
        })

        const PokemonPicture = wrapper.find('pokemon-picture-stub')
        const PokemonOptions = wrapper.find('pokemon-options-stub')

        // console.info(PokemonPicture.html())
        // console.info(PokemonOptions.html())

        expect(PokemonPicture.exists()).toBeTruthy()
        expect(PokemonOptions.exists()).toBeTruthy()

        expect(PokemonOptions.attributes('pokemonoptions')).toBeTruthy()
        expect(PokemonPicture.attributes('pokemonid')).toEqual(pokemons[2].id.toString())
    })

    test('Debe llamar al metodo checkAnswer()', async () => {
        wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemons: pokemons,
                    pokemon: pokemons[3],
                    showPokemon: false,
                }
            }
        })

        const checkAnswerSpy = jest.spyOn(wrapper.vm, 'checkAnswer')

        await wrapper.vm.checkAnswer(25)

        expect(wrapper.vm.showPokemon).toBe(true)
        expect(checkAnswerSpy).toHaveBeenCalledWith(25)

        const h2 = wrapper.find('[data-testid="pokemon-name"]')

        expect(h2.text().toLowerCase()).toContain(pokemons[3].name)
    })
})
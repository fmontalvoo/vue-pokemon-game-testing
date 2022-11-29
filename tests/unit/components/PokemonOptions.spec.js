import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions.vue'

describe('PokemonOptions', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemonOptions: [
                    { id: 1, name: 'bulbasaur' },
                    { id: 4, name: 'charmander' },
                    { id: 7, name: 'squirtle' },
                    { id: 25, name: 'pikachu' },
                ]
            }
        })
    })

    test('El componente PokemonOptions debe crearse', () => {
        expect(wrapper).toBeTruthy()
    })

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe mostrar los pokemons en los <li> de la UI', () => {
        const items = wrapper.findAll('li')

        expect(items.length).toEqual(wrapper.vm.pokemonOptions.length)

        items.forEach((item, i) => {
            expect(item.text().toLowerCase()).toEqual(wrapper.vm.pokemonOptions[i].name)
        })
    })

    test('Debe emitir el pokemon seleccionado al hacer click en la opcion', () => {
        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li3.trigger('click')
        li4.trigger('click')

        expect(wrapper.emitted('selectPokemon')[0]).toEqual([7])
        expect(wrapper.emitted('selectPokemon')[1]).toEqual([25])
    })
})
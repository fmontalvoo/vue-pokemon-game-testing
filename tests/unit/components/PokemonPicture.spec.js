import { shallowMount } from '@vue/test-utils'
import PokemonPicture from '@/components/PokemonPicture.vue'

describe('PokemonPicture', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false,
            }
        })
    })

    test('El componente PokemonPicture debe crearse', () => {
        expect(wrapper).toBeTruthy()
    });

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('Debe mostrar la imagen del pokemon 7', async () => {
        await wrapper.setProps({
            pokemonId: 7,
        })

        const [imgHidden, imgPokemon] = wrapper.findAll('img')

        expect(imgHidden).toBeDefined()
        expect(imgHidden.exists()).toBeTruthy()
        expect(imgHidden.classes('hidden-pokemon')).toBeTruthy()

        expect(imgPokemon).toBeUndefined()

        await wrapper.setProps({
            showPokemon: true,
        })

        const img = wrapper.find('img')

        expect(img).toBeDefined()
        expect(img.exists()).toBeTruthy()
        expect(img.classes('fade-in')).toBeTruthy()

        expect(img.attributes('src')).toContain(`${wrapper.vm.pokemonId}.svg`)
        expect(img.attributes('src').endsWith(`${wrapper.vm.pokemonId}.svg`)).toBeTruthy()
    })

    test('Debe mostrar la imagen del pokemon si showPokemon es verdadero', async () => {
        await wrapper.setProps({
            showPokemon: true,
        })

        const img = wrapper.find('img')

        expect(img).toBeDefined()
        expect(img.exists()).toBeTruthy()
        expect(img.classes('fade-in')).toBeTruthy()
    })
})
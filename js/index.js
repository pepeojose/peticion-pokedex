const url_pokemons = 'https://pokeapi.co/api/v2/pokemon/';
const buttonSelect = document.getElementById('select')
const buttonReload = document.getElementById('reload')

buttonReload.addEventListener('click', () => {
    location.reload()
})

buttonSelect.addEventListener('click', () => {
    const numberRandom = getNumberRandom(1, 151)
    fechPokemonData(numberRandom)
})

const getNumberRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const fechPokemonData = async(id) => {
    try {
        const res = await fetch(`${url_pokemons}${id}`)
        const data = await res.json()

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            experience: data.base_experience,
            attack: data.stats[1].base_stat,
            special: data.stats[3].base_stat,
            defense: data.stats[2].base_stat
        }
        paintCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const paintCard = (pokemon) => {
    const main = document.getElementById('main')
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.getElementById('image-pokemon').setAttribute('src', pokemon.img)
    clone.getElementById('card-name').innerHTML = `${pokemon.name}  <span class= 'card__hp'>${pokemon.hp} hp</span>`
    clone.getElementById('experience').textContent = `${pokemon.experience} Exp`
    clone.querySelectorAll('.card__number')[0].textContent = pokemon.attack + 'K'
    clone.querySelectorAll('.card__number')[1].textContent = pokemon.special + 'K'
    clone.querySelectorAll('.card__number')[2].textContent = pokemon.defense + 'K'


    fragment.appendChild(clone)
    main.appendChild(fragment)
}
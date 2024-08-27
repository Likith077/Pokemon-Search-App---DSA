const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const displayPokemonInfo = (data) => {
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `${data.weight}`;  // Remove division by 10
    height.textContent = `${data.height}`;  // Remove division by 10
    
    types.innerHTML = '';
    data.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name.toUpperCase();
        types.appendChild(typeElement);
    });

    hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAttack.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDefense.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

    sprite.src = data.sprites.front_default;
    sprite.alt = data.name;
};

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        alert('Please enter a Pokémon name or ID');
        return;
    }

    try {
        const data = await fetchPokemon(searchTerm);
        displayPokemonInfo(data);
    } catch (error) {
        alert('Pokémon not found');
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
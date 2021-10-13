let quantidade = document.querySelector("input");
pegaPokemons(9);
quantidade.addEventListener("keyup", (event) => {
    if (event.code === 'Enter') {
        quantidade = quantidade.value;
        pegaPokemons(quantidade);
        quantidade = document.querySelector("input");
    }
})
function primeiraLetraMaiusculo(str) {
    string = str.charAt(0).toUpperCase() + str.substring(1);
    return string;
}
class Pokemon {
    constructor(name, img) {
        this.name = name;
        this.img = img;
    }
}
function pegaPokemons(quantidade) {
    let todosPokemons = [];
    fetch("https://pokeapi.co/api/v2/pokemon?limit=" + quantidade)
        .then(response => response.json())
        .then(allpokemon => {
            allpokemon.results.map((val) => {
                let pokemon;
                fetch(val.url)
                    .then(response => response.json())
                    .then(pokemonAtual => {

                        pokemon = new
                            Pokemon(primeiraLetraMaiusculo(val.name), pokemonAtual.sprites.front_default); todosPokemons.push(pokemon);
                        if (todosPokemons.length == quantidade) {
                            let pokemonBoxes = document.querySelector('.pokemonBoxes');
                            pokemonBoxes.innerHTML = "";
                            todosPokemons.map(
                                (val) => {
                                    pokemonBoxes.innerHTML +=
                                        `
                    <div class="pokemonBox">
                        <p>${val.name}</p>
                        <img src=${val.img}>
                    </div>`;

                                })
                        }
                    })
            })

        })
}



import getPokemonStats from "./choosePokemon.js";

const fetchPokemon = async () => {
    let continueFetch = true;
    while (continueFetch) {
        const { chosen_pokemon, chosen_attributes, proceeding } =
            await getPokemonStats();
        const fetchApi = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${chosen_pokemon}`
        );
        const result = await fetchApi.json();

        if (chosen_attributes.includes("Stats")) {
            result.forEach((stat) => {
                console.log(`${stat.stat.name}: ${stat.base_stat}`);
            });
        }
        continueFetch = proceeding;
    }
};
fetchPokemon();

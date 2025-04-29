import getPokemonStats from "./choosePokemon.js";

import {
    createStatsFile,
    createSpriteFolder,
    createArtwork,
} from "./createFile.js";

const fetchPokemon = async () => {
    // creating a loop

    let continueFetch = true;
    while (continueFetch) {
        const { chosen_pokemon, chosen_attributes, proceeding } =
            await getPokemonStats();

        // fetching pokemon data

        const fetchApi = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${chosen_pokemon}`
        );
        const result = await fetchApi.json();

        // creating stats' text

        const showStats = result.stats
            .map((stat) => {
                return `${stat.stat.name}: ${stat.base_stat}`;
            })
            .join("\n");

        const spriteUrl = result.sprites;

        const artworkUrl =
            result.sprites.other["official-artwork"].front_default;

        // creating and inserting stats' txt file
        await createStatsFile(chosen_pokemon, chosen_attributes, showStats);

        // creating sprites png files and folder
        await createSpriteFolder(chosen_pokemon, chosen_attributes, spriteUrl);

        // creating artwork file
        await createArtwork(chosen_pokemon, chosen_attributes, artworkUrl);

        continueFetch = proceeding;
    }
};

fetchPokemon();

export default fetchPokemon;

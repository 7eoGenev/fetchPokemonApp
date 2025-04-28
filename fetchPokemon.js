import getPokemonStats from "./choosePokemon.js";
import * as file from "fs/promises";
import { createStatsFile, createSpriteFolder } from "./createFile.js";

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
        // creating sprites png

        // creating and inserting stats' txt file
        await createStatsFile(chosen_pokemon, chosen_attributes, showStats);
        await createSpriteFolder(chosen_pokemon, chosen_attributes, spriteUrl);

        // creating sprites files

        continueFetch = proceeding;
    }
};

fetchPokemon();

export default fetchPokemon;

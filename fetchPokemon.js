import chalk from "chalk";
import {
    getPokemonStats,
    choosePokemonStats,
    showPokemonList,
} from "./choosePokemon.js";

import {
    createStatsFile,
    createSpriteFolder,
    createArtwork,
} from "./createFile.js";

const fetchPokemon = async () => {
    console.log(
        chalk.bgYellow("Pokemon list:\n"),
        chalk.yellow(await showPokemonList())
    );
    let continueFetch = true;

    // creating a loop
    while (continueFetch) {
        try {
            const { chosen_pokemon } = await getPokemonStats();
            const { chosen_attributes, proceeding } =
                await choosePokemonStats();
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
            await createSpriteFolder(
                chosen_pokemon,
                chosen_attributes,
                spriteUrl
            );

            // creating artwork file
            await createArtwork(chosen_pokemon, chosen_attributes, artworkUrl);

            continueFetch = proceeding;
        } catch (error) {
            console.error(
                chalk.red("Error occured fetching pokemon data:\n"),
                error
            );
        }
    }
};

fetchPokemon();

export default fetchPokemon;

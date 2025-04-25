import getPokemonStats from "./choosePokemon.js";
import createTextFile from "./saving.js";
import * as file from "fs/promises";

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

        if (chosen_attributes.includes("Stats")) {
            showStats;
        }

        // creating and inserting stats' txt file

        await file.writeFile(
            `./${chosen_pokemon}.txt`,
            `${showStats}`,
            "utf-8"
        );

        // whether or not to stop the loop

        continueFetch = proceeding;
    }
};

fetchPokemon();

export default fetchPokemon;

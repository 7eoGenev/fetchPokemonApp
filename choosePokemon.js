import inquirer from "inquirer";

const showPokemonList = async () => {
    let pokemonList = [];
    const url = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";
    const showPokemon = await fetch(url);
    const response = await showPokemon.json();
    for (const key of response.results) {
        pokemonList.push(key.name);
    }
    pokemonList.push("others...");
    return pokemonList.join(", ");
};

const getPokemonStats = async () => {
    try {
        const pokemon = await inquirer.prompt([
            {
                type: "input",
                name: "chosen_pokemon",
                message: "Choose a pokemon:",
            },
        ]);
        return pokemon;
    } catch (error) {
        console.error(chalk.red("An error occurred:\n"), error);
        throw error;
    }
};
const choosePokemonStats = async () => {
    try {
        const pokemon = await inquirer.prompt([
            {
                type: "checkbox",
                name: "chosen_attributes",
                message: "Pokemon info to download:",
                choices: ["Stats", "Sprites", "Artwork"],
            },
            {
                type: "confirm",
                name: "proceeding",
                message: "Do you want to move on with another Pokemon:",
                default: false,
            },
        ]);
        return pokemon;
    } catch (error) {
        console.error(chalk.red("An error occurred:\n"), error);
        throw error;
    }
};

export { getPokemonStats, choosePokemonStats, showPokemonList };

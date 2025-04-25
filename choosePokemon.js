import inquirer from "inquirer";

const getPokemonStats = async () => {
    try {
        const pokemon = await inquirer.prompt([
            {
                type: "input",
                name: "chosen_pokemon",
                message: "Choose a pokemon:",
            },
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
        console.error("An error occurred:", error);
        throw error;
    }
};

export default getPokemonStats;

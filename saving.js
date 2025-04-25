import getPokemonStats from "./choosePokemon.js";
import * as file from "fs/promises";

async function createTextFile() {
    const { chosen_pokemon } = await getPokemonStats();
    await file.writeFile(`./${chosen_pokemon}.txt`);
}

export default createTextFile;

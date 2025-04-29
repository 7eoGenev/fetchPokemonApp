import * as file from "fs/promises";
import path from "path";

// creating and inserting stats' txt file

export async function createStatsFile(pokemonName, attributes, statsText) {
    if (attributes.includes("Stats")) {
        const pathToFile = path.join(".", `./${pokemonName}_stats.txt`);
        await file.writeFile(pathToFile, `${statsText}`, "utf-8");
        console.log(`Saved ${pokemonName}_stats.txt`);
    }
}

//creating sprite folder with png files

export async function createSpriteFolder(
    pokemonName,
    attributes,
    spritesObject
) {
    if (attributes.includes("Sprites")) {
        try {
            const folderPath = path.join(".", `${pokemonName}_Sprites`);
            // const folderPath = `./${pokemonName}_Sprites`;
            await file.mkdir(folderPath, { recursive: true });

            for (const [spriteKey, spriteValue] of Object.entries(
                spritesObject
            )) {
                if (typeof spriteValue === "string" && spriteValue) {
                    const pathToFile = path.join(
                        folderPath,
                        `${spriteKey}.png`
                    );
                    const response = await fetch(spriteValue);
                    const arrayBuffer = await response.arrayBuffer();

                    await file.writeFile(pathToFile, Buffer.from(arrayBuffer));
                    console.log(`Saved sprite: ${spriteKey}`);
                }
            }
        } catch (error) {
            console.error("Error saved sprites:", error.message);
        }
    }
}

// creating artwork file

export async function createArtwork(pokemonName, attributes, artwork) {
    if (attributes.includes("Artwork")) {
        try {
            const fetchArtwork = await fetch(artwork);
            const bufferArtwork = await fetchArtwork.arrayBuffer();
            const pathToFile = path.join(".", `${pokemonName}_artwork.png`);

            await file.writeFile(pathToFile, Buffer.from(bufferArtwork));
            console.log(`Saved ${pokemonName} artwork`);
        } catch (error) {
            console.error("Error saved artwork:", error.message);
        }
    }
}

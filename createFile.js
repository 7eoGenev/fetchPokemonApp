import * as file from "fs/promises";
import path from "path";

// creating and inserting stats' txt file

export async function createStatsFile(pokemonName, attributes, statsText) {
    if (attributes.includes("Stats")) {
        await file.writeFile(
            `./${pokemonName}_stats.txt`,
            `${statsText}`,
            "utf-8"
        );
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
            const folderPath = `./${pokemonName}_Sprites`;
            await file.mkdir(folderPath, { recursive: true });

            for (const [spriteKey, spriteValue] of Object.entries(
                spritesObject
            )) {
                if (typeof spriteValue === "string" && spriteValue) {
                    const response = await fetch(spriteValue);
                    const arrayBuffer = await response.arrayBuffer();

                    await file.writeFile(
                        `${folderPath}/${spriteKey}.png`,
                        Buffer.from(arrayBuffer)
                    );
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

            await file.writeFile(
                `./${pokemonName}_artwork.png`,
                Buffer.from(bufferArtwork)
            );
            console.log(`Saved ${pokemonName} artwork`);
        } catch (error) {
            console.error("Error saved artwork:", error.message);
        }
    }
}

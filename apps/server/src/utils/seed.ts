import db from "../db/index.js";
import { filmsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config();

const TARGET = 200;
// IDs IMDb valides se trouvent entre tt0000001 et tt9999999
const MIN_ID = 1;
const MAX_ID = 500000;

function randomImdbId(): string {
  const num = Math.floor(Math.random() * (MAX_ID - MIN_ID + 1)) + MIN_ID;
  return `tt${String(num).padStart(7, "0")}`;
}

async function fetchFromOMDB(imdbId: string): Promise<any> {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbId}`
  );
  return response.json();
}

async function filmExistsInDB(title: string): Promise<boolean> {
  const existing = await db
    .select()
    .from(filmsTable)
    .where(eq(filmsTable.title, title))
    .limit(1);
  return existing.length > 0;
}

async function seedFilms() {
  let imported = 0;
  let attempts = 0;
  const maxAttempts = TARGET * 10; // évite boucle infinie

  console.log(`🎬 Début de l'import de ${TARGET} films...`);

  while (imported < TARGET && attempts < maxAttempts) {
    attempts++;
    const imdbId = randomImdbId();

    try {
      const data = await fetchFromOMDB(imdbId);

      // Ignorer si non trouvé ou pas un film
      if (data.Response === "False" || data.Type !== "movie") continue;

      // Vérifier doublon
      const exists = await filmExistsInDB(data.Title);
      if (exists) {
        console.log(`⏭️  Déjà en DB : ${data.Title}`);
        continue;
      }

      await db.insert(filmsTable).values({
        title: data.Title,
        description: data.Plot !== "N/A" ? data.Plot : null,
        poster_url: data.Poster !== "N/A" ? data.Poster : null,
        language: data.Language !== "N/A" ? data.Language : null,
        actors: data.Actors !== "N/A" ? data.Actors.split(", ") : [],
        awards: data.Awards !== "N/A" ? data.Awards.split(". ") : [],
        released_date: data.Released !== "N/A" ? new Date(data.Released) : null,
        author: data.Director !== "N/A" ? data.Director : null,
        trailer: null,
      });

      imported++;
      console.log(`✅ [${imported}/${TARGET}] Importé : ${data.Title} (${imdbId})`);

    } catch (error) {
      console.error(`❌ Erreur pour ${imdbId}:`, error);
    }
  }

  console.log(`\n🏁 Terminé ! ${imported} films importés en ${attempts} tentatives.`);
  process.exit(0);
}

seedFilms();
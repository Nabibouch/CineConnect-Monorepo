import db from "../db/index.js";
import { actors } from "../db/schema.js";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config();

const TARGET = 50;

async function fetchFromTMDB(page: number): Promise<any> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=${page}`
  );
  return res.json();
}

async function fetchBiography(tmdbId: number): Promise<string> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
  );
  const data = await res.json() as { biography?: string };
  return data.biography ?? "";
}

function getPoster(path: string | null) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
}

async function actorExistsInDB(name: string): Promise<boolean> {
  const existing = await db
    .select()
    .from(actors)
    .where(eq(actors.name, name))
    .limit(1);
  return existing.length > 0;
}

async function seedActors() {
  let imported = 0;
  let page = 1;

  console.log(`🎬 Début de l'import TMDB de ${TARGET} acteurs...`);

  while (imported < TARGET) {
    try {
      const data: any = await fetchFromTMDB(page);

      for (const person of data.results) {
        if (imported >= TARGET) break;

        const exists = await actorExistsInDB(person.name);
        if (exists) {
          console.log(`⏭️ Déjà en DB : ${person.name}`);
          continue;
        }

        const biography = await fetchBiography(person.id);

        await db.insert(actors).values({
          name: person.name,
          biography,
          poster_url: getPoster(person.profile_path),
        });

        imported++;
        console.log(`✅ [${imported}/${TARGET}] Importé : ${person.name}`);
      }

      page++;
    } catch (error) {
      console.error(`❌ Erreur page ${page}:`, error);
    }
  }

  console.log(`\n🏁 Terminé ! ${imported} acteurs importés.`);
  process.exit(0);
}

seedActors();
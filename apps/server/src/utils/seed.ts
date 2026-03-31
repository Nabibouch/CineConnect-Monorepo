import db from "../db/index.js";
import { filmsTable, ratingsTable, usersTable } from "../db/schema.js";
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

// async function fetchFromOMDB(imdbId: string): Promise<any> {
//   const response = await fetch(
//     `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbId}`
//   );
//   return response.json();
// }

async function filmExistsInDB(title: string): Promise<boolean> {
  const existing = await db
    .select()
    .from(filmsTable)
    .where(eq(filmsTable.title, title))
    .limit(1);
  return existing.length > 0;
}

// async function seedFilms() {
//   let imported = 0;
//   let attempts = 0;
//   const maxAttempts = TARGET * 10; // évite boucle infinie

//   console.log(`🎬 Début de l'import de ${TARGET} films...`);

//   while (imported < TARGET && attempts < maxAttempts) {
//     attempts++;
//     const imdbId = randomImdbId();

//     try {
//       const data = await fetchFromOMDB(imdbId);

//       // Ignorer si non trouvé ou pas un film
//       if (data.Response === "False" || data.Type !== "movie") continue;

//       // Vérifier doublon
//       const exists = await filmExistsInDB(data.Title);
//       if (exists) {
//         console.log(`⏭️  Déjà en DB : ${data.Title}`);
//         continue;
//       }

//       await db.insert(filmsTable).values({
//         title: data.Title,
//         description: data.Plot !== "N/A" ? data.Plot : null,
//         poster_url: data.Poster !== "N/A" ? data.Poster : null,
//         language: data.Language !== "N/A" ? data.Language : null,
//         actors: data.Actors !== "N/A" ? data.Actors.split(", ") : [],
//         awards: data.Awards !== "N/A" ? data.Awards.split(". ") : [],
//         released_date: data.Released !== "N/A" ? new Date(data.Released) : null,
//         author: data.Director !== "N/A" ? data.Director : null,
//         trailer: null,
//       });

//       imported++;
//       console.log(`✅ [${imported}/${TARGET}] Importé : ${data.Title} (${imdbId})`);

//     } catch (error) {
//       console.error(`❌ Erreur pour ${imdbId}:`, error);
//     }
//   }

//   console.log(`\n🏁 Terminé ! ${imported} films importés en ${attempts} tentatives.`);
//   process.exit(0);
// }

// seedFilms();

async function fetchFromTMDB(page: number): Promise<any> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  );
  return res.json();
}

function getPoster(path: string | null) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
}

async function fetchGenresFromTMDB(): Promise<Record<number, string>> {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
  );
  const data = await res.json() as { genres?: { id: number; name: string }[] };
  const genreMap: Record<number, string> = {};
  if (data.genres) {
    for (const genre of data.genres) {
      genreMap[genre.id] = genre.name;
    }
  }
  return genreMap;
}

async function seedFilms() {
  let imported = 0;
  let attempts = 0;
  let page = 1;

  const maxAttempts = TARGET * 10;

  console.log(`🎬 Récupération des genres TMDB...`);
  const genreMap = await fetchGenresFromTMDB();

  console.log(`🤖 Création ou récupération de l'utilisateur bot...`);
  let botUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, "bot@gmail.com"))
    .limit(1)
    .then((res) => res[0]);

  if (!botUser) {
    botUser = await db
      .insert(usersTable)
      .values({
        username: "bot",
        email: "bot@gmail.com",
        password: "mdp123",
      })
      .returning()
      .then((res) => res[0]);
  }
  const botUserId = botUser.id;

  console.log(`🎬 Début de l'import TMDB de ${TARGET} films...`);

  while (imported < TARGET && attempts < maxAttempts) {
    attempts++;

    try {
      const data: any = await fetchFromTMDB(page);

      for (const movie of data.results) {
        if (imported >= TARGET) break;

        // Vérifier doublon
        const exists = await filmExistsInDB(movie.title);
        if (exists) {
          console.log(`⏭️ Déjà en DB : ${movie.title}`);
          continue;
        }

        const categories = movie.genre_ids
          ? movie.genre_ids.map((id: number) => genreMap[id]).filter(Boolean)
          : [];

        const [insertedFilm] = await db.insert(filmsTable).values({
          title: movie.title,
          description: movie.overview || null,
          poster_url: getPoster(movie.poster_path),
          language: movie.original_language || null,
          actors: [],
          awards: [],
          released_date: movie.release_date
            ? new Date(movie.release_date)
            : null,
          author: null,
          trailer: null,
          categories: categories,
        }).returning({ id: filmsTable.id });

        if (movie.vote_average != null) {
          await db.insert(ratingsTable).values({
            film_id: insertedFilm.id,
            user_id: botUserId,
            rate: Math.round(movie.vote_average),
          });
        }


        imported++;
        console.log(`✅ [${imported}/${TARGET}] Importé : ${movie.title}`);
      }

      page++; // 🔥 IMPORTANT → passe à la page suivante

    } catch (error) {
      console.error(`❌ Erreur page ${page}:`, error);
    }
  }

  console.log(`\n🏁 Terminé ! ${imported} films importés en ${attempts} pages.`);
  process.exit(0);
}

seedFilms();
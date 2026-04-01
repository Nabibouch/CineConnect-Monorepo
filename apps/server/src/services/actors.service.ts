import db from "../db/index.js";
import { actors } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { normalizeId } from "../utils/normalizeId.js";

const actorService = {
  async createActor(data: { name: string; biography?: string; poster_url?: string }) {
    const [actor] = await db
      .insert(actors)
      .values(data)
      .returning();
    return actor;
  },

  async findAllActors() {
    return db.select().from(actors);
  },

  async findActorById(id: string) {
  const actorId = normalizeId(id);

  const [actor] = await db
    .select()
    .from(actors)
    .where(eq(actors.id, actorId))
    .limit(1);

  if (!actor) {
    throw new Error(`Aucun acteur avec l'id ${actorId} n'a été trouvé`);
  }

  return actor;
},
};

export default actorService;
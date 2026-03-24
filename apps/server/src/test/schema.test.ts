import { describe, it, expect, afterAll } from "vitest";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";

describe("usersTable", () => {
  afterAll(async () => {
    
  });

  it("should insert a user", async () => {
    const [user] = await db
      .insert(usersTable)
      .values({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      })
      .returning();

    expect(user.id).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@example.com");
  });
});
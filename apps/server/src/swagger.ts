import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import type { Express } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Génère le spec OpenAPI à partir des JSDoc `@openapi` présents dans le code.
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Monorepo",
      version: "1.0.0",
    },
    tags: [
      { name: "Users" },
      { name: "Films" },
      { name: "Ratings" },
      { name: "Posts" },
      { name: "Comments" },
      { name: "Categories" },
      { name: "Actors" },
      { name: "Conversations" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description:
            "Authentification via cookie `token` (httpOnly). Swagger UI peut envoyer le cookie si configuré.",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          required: ["error"],
        },
        IdResponse: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
        UserPublic: {
          type: "object",
          properties: {
            id: { type: "integer" },
            username: { type: "string" },
            email: { type: "string", nullable: true },
            avatar_url: { type: "string", nullable: true },
            bio: { type: "string", nullable: true },
          },
          required: ["id", "username"],
        },
        SignUpRequest: {
          type: "object",
          properties: {
            username: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
          required: ["username", "email", "password"],
        },
        SignInRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 1 },
          },
          required: ["email", "password"],
        },
        Film: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string", nullable: true },
            poster_url: { type: "string", nullable: true },
            author: { type: "string", nullable: true },
            language: { type: "string", nullable: true },
            trailer: { type: "string", nullable: true },
            actors: { type: "array", items: { type: "string" }, nullable: true },
            awards: { type: "array", items: { type: "string" }, nullable: true },
            released_date: { type: "string", format: "date-time", nullable: true },
            vote_average: { type: "number", format: "float", nullable: true },
            categories: { type: "array", items: { type: "string" }, nullable: true },
            posts: { type: "array", items: { $ref: "#/components/schemas/Post" }, nullable: true },
            comments: {
              type: "array",
              items: { $ref: "#/components/schemas/Comment" },
              nullable: true,
            },
            ratings: { type: "array", items: { $ref: "#/components/schemas/Rating" }, nullable: true },
            created_at: { type: "string", format: "date-time", nullable: true },
          },
          required: ["id", "title", "created_at"],
        },
        FilmCreateRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            poster_url: { type: "string", nullable: true },
            author: { type: "string", nullable: true },
            language: { type: "string", nullable: true },
            trailer: { type: "string", nullable: true },
            actors: { type: "array", items: { type: "string" }, nullable: true },
            awards: { type: "array", items: { type: "string" }, nullable: true },
            released_date: { type: "string", format: "date-time", nullable: true },
            vote_average: { type: "number", format: "float", nullable: true },
            categories: { type: "array", items: { type: "string" }, nullable: true },
          },
          required: ["title", "description"],
        },
        FilmUpdateRequest: {
          allOf: [{ $ref: "#/components/schemas/FilmCreateRequest" }],
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
          required: ["id", "name"],
        },
        CategoryCreateRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
          required: ["name"],
        },
        Post: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string", nullable: true },
            user_id: { type: "integer", nullable: true },
            film_id: { type: "integer", nullable: true },
            comments: {
              type: "array",
              items: { $ref: "#/components/schemas/Comment" },
              nullable: true,
            },
          },
          required: ["id", "title"],
        },
        PostCreateRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string", nullable: true },
            user_id: { type: "integer", nullable: true },
            film_id: { type: "integer", nullable: true },
          },
          required: ["title"],
        },
        PostUpdateRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string", nullable: true },
            user_id: { type: "integer", nullable: true },
            film_id: { type: "integer", nullable: true },
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            user_id: { type: "integer" },
            film_id: { type: "integer", nullable: true },
            post_id: { type: "integer", nullable: true },
          },
          required: ["id", "title", "user_id"],
        },
        CommentCreateRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            user_id: { type: "integer" },
            film_id: { type: "integer", nullable: true },
            post_id: { type: "integer", nullable: true },
          },
          required: ["title", "user_id"],
        },
        CommentUpdateRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            user_id: { type: "integer" },
            film_id: { type: "integer", nullable: true },
            post_id: { type: "integer", nullable: true },
          },
        },
        Rating: {
          type: "object",
          properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            film_id: { type: "integer" },
            rate: { type: "integer" },
          },
          required: ["id", "user_id", "film_id", "rate"],
        },
        RatingCreateRequest: {
          type: "object",
          properties: {
            user_id: { type: "integer" },
            film_id: { type: "integer" },
            rate: { type: "integer" },
          },
          required: ["user_id", "film_id", "rate"],
        },
        RatingUpdateRequest: {
          type: "object",
          properties: {
            user_id: { type: "integer" },
            film_id: { type: "integer" },
            rate: { type: "integer" },
          },
        },
        Actor: {
          type: "object",
          properties: {
            id: { type: "integer" },
            poster_url: { type: "string", nullable: true },
            name: { type: "string", nullable: true },
            biography: { type: "string", nullable: true },
          },
          required: ["id", "name"],
        },
        ActorCreateRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            biography: { type: "string", nullable: true },
            poster_url: { type: "string", nullable: true },
          },
          required: ["name"],
        },
        FollowRequest: {
          type: "object",
          properties: {
            followerId: { type: "integer" },
          },
          required: ["followerId"],
        },
        AddCategoryToFilmRequest: {
          type: "object",
          properties: {
            category: { type: "string" },
          },
          required: ["category"],
        },
        CreateConversationRequest: {
          type: "object",
          properties: {
            userIds: { type: "array", items: { type: "integer" }, minItems: 2 },
          },
          required: ["userIds"],
        },
        AddConversationMemberRequest: {
          type: "object",
          properties: {
            userId: { type: "integer" },
          },
          required: ["userId"],
        },
        Conversation: {
          type: "object",
          properties: {
            id: { type: "integer" },
            created_at: { type: "string", format: "date-time", nullable: true },
          },
          required: ["id"],
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "routes", "*.route.js"),
    path.join(__dirname, "controllers", "*.controller.js"),
  ],
});

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


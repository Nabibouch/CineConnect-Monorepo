ALTER TABLE "categorization" RENAME COLUMN "categorie_id" TO "category_id";--> statement-breakpoint
ALTER TABLE "films" RENAME COLUMN "release_date" TO "released_date";--> statement-breakpoint
ALTER TABLE "ratings" RENAME COLUMN "movie_id" TO "film_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "categorization" DROP CONSTRAINT "categorization_categorie_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_movie_id_films_id_fk";
--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "poster_url" text;--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "author" varchar(255);--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "language" varchar(255);--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "trailer" text;--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "actors" varchar(255)[];--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "awards" varchar(255)[];--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "categorization" ADD CONSTRAINT "categorization_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_film_id_films_id_fk" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE no action ON UPDATE no action;
CREATE TABLE "Actors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Actors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"poster_url" text,
	"name" text,
	"biography" text
);
--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "vote_average" real;--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "categories" varchar(255)[];--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "description" text;
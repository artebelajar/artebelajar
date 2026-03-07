CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"name" text NOT NULL,
	"text" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "project_idx" ON "comments" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "timestamp_idx" ON "comments" USING btree ("timestamp");
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sites_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer NOT NULL,
  	"poster_id" integer NOT NULL
  );
  
  CREATE TABLE "sites_videos_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "sites" ADD COLUMN "hero_video_id" integer;
  ALTER TABLE "sites" ADD COLUMN "hero_video_poster_id" integer;
  ALTER TABLE "sites_videos" ADD CONSTRAINT "sites_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_videos" ADD CONSTRAINT "sites_videos_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_videos" ADD CONSTRAINT "sites_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_videos_locales" ADD CONSTRAINT "sites_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_videos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sites_videos_order_idx" ON "sites_videos" USING btree ("_order");
  CREATE INDEX "sites_videos_parent_id_idx" ON "sites_videos" USING btree ("_parent_id");
  CREATE INDEX "sites_videos_video_idx" ON "sites_videos" USING btree ("video_id");
  CREATE INDEX "sites_videos_poster_idx" ON "sites_videos" USING btree ("poster_id");
  CREATE UNIQUE INDEX "sites_videos_locales_locale_parent_id_unique" ON "sites_videos_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "sites" ADD CONSTRAINT "sites_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites" ADD CONSTRAINT "sites_hero_video_poster_id_media_id_fk" FOREIGN KEY ("hero_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sites_hero_video_idx" ON "sites" USING btree ("hero_video_id");
  CREATE INDEX "sites_hero_video_poster_idx" ON "sites" USING btree ("hero_video_poster_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sites_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sites_videos_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sites_videos" CASCADE;
  DROP TABLE "sites_videos_locales" CASCADE;
  ALTER TABLE "sites" DROP CONSTRAINT "sites_hero_video_id_media_id_fk";
  
  ALTER TABLE "sites" DROP CONSTRAINT "sites_hero_video_poster_id_media_id_fk";
  
  DROP INDEX "sites_hero_video_idx";
  DROP INDEX "sites_hero_video_poster_idx";
  ALTER TABLE "sites" DROP COLUMN "hero_video_id";
  ALTER TABLE "sites" DROP COLUMN "hero_video_poster_id";`)
}

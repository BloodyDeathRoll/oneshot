import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'si');
  CREATE TYPE "public"."enum_sites_languages" AS ENUM('en', 'si');
  CREATE TYPE "public"."enum_sites_languages_spoken" AS ENUM('en', 'si', 'ta', 'ru', 'de', 'fr', 'es', 'it', 'sv', 'other');
  CREATE TYPE "public"."enum_sites_copy_blocks_slot" AS ENUM('intro', 'about', 'offer', 'info');
  CREATE TYPE "public"."enum_sites_opening_hours_days" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum_sites_price_list_currency" AS ENUM('LKR', 'USD', 'EUR');
  CREATE TYPE "public"."enum_sites_price_list_unit" AS ENUM('per_hour', 'per_lesson', 'per_day', 'per_week', 'per_person', 'flat');
  CREATE TYPE "public"."enum_sites_lessons_level" AS ENUM('first_time', 'beginner', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum_sites_lessons_currency" AS ENUM('LKR', 'USD', 'EUR');
  CREATE TYPE "public"."enum_sites_lessons_unit" AS ENUM('per_hour', 'per_lesson', 'per_day', 'per_week', 'per_person', 'flat');
  CREATE TYPE "public"."enum_sites_rentals_currency" AS ENUM('LKR', 'USD', 'EUR');
  CREATE TYPE "public"."enum_sites_rentals_unit" AS ENUM('per_hour', 'per_lesson', 'per_day', 'per_week', 'per_person', 'flat');
  CREATE TYPE "public"."enum_sites_ratings_platform" AS ENUM('google', 'booking', 'hostelworld', 'agoda', 'tripadvisor', 'airbnb', 'other');
  CREATE TYPE "public"."enum_sites_ratings_scale" AS ENUM('5', '10');
  CREATE TYPE "public"."enum_sites_testimonials_source" AS ENUM('google', 'booking', 'hostelworld', 'agoda', 'tripadvisor', 'airbnb', 'other');
  CREATE TYPE "public"."enum_sites_business_type" AS ENUM('surf_school', 'surf_camp', 'beach_lodging', 'board_rental', 'surf_shop', 'shaper', 'other');
  CREATE TYPE "public"."enum_users_role" AS ENUM('super-admin', 'owner');
  CREATE TABLE "sites_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_sites_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sites_languages_spoken" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_sites_languages_spoken",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sites_copy_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slot" "enum_sites_copy_blocks_slot" DEFAULT 'about' NOT NULL
  );
  
  CREATE TABLE "sites_copy_blocks_locales" (
  	"heading" varchar,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_opening_hours_days" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_sites_opening_hours_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sites_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opens" varchar NOT NULL,
  	"closes" varchar NOT NULL
  );
  
  CREATE TABLE "sites_price_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" numeric NOT NULL,
  	"currency" "enum_sites_price_list_currency" DEFAULT 'LKR' NOT NULL,
  	"unit" "enum_sites_price_list_unit" DEFAULT 'per_lesson' NOT NULL
  );
  
  CREATE TABLE "sites_price_list_locales" (
  	"label" varchar NOT NULL,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "sites_photos_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sleeps" numeric,
  	"photo_id" integer
  );
  
  CREATE TABLE "sites_rooms_locales" (
  	"label" varchar NOT NULL,
  	"beds" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_lessons_level" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_sites_lessons_level",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sites_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration_min" numeric,
  	"price" numeric,
  	"currency" "enum_sites_lessons_currency",
  	"unit" "enum_sites_lessons_unit"
  );
  
  CREATE TABLE "sites_lessons_locales" (
  	"label" varchar NOT NULL,
  	"group_size" varchar,
  	"includes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sites_credentials_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_rentals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" numeric,
  	"currency" "enum_sites_rentals_currency",
  	"unit" "enum_sites_rentals_unit"
  );
  
  CREATE TABLE "sites_rentals_locales" (
  	"label" varchar NOT NULL,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "sites_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sites_amenities_locales" (
  	"label" varchar NOT NULL,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_sites_ratings_platform" NOT NULL,
  	"score" numeric NOT NULL,
  	"scale" "enum_sites_ratings_scale" NOT NULL,
  	"count" numeric NOT NULL,
  	"url" varchar,
  	"captured_at" varchar NOT NULL
  );
  
  CREATE TABLE "sites_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"source" "enum_sites_testimonials_source" NOT NULL,
  	"date" varchar
  );
  
  CREATE TABLE "sites_booking_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "sites_booking_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "sites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"business_name" varchar NOT NULL,
  	"business_type" "enum_sites_business_type" DEFAULT 'surf_school' NOT NULL,
  	"stay_info_check_in_from" varchar,
  	"stay_info_check_in_to" varchar,
  	"stay_info_check_out_from" varchar,
  	"stay_info_check_out_to" varchar,
  	"stay_info_min_nights" numeric,
  	"forecast_enabled" boolean DEFAULT false,
  	"forecast_rosa_spot_id" varchar,
  	"forecast_spot_name" varchar,
  	"contact_phone" varchar,
  	"contact_whatsapp" varchar,
  	"contact_email" varchar,
  	"contact_map_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sites_locales" (
  	"tagline" varchar,
  	"feature_line" varchar,
  	"closing" varchar,
  	"hours_note" varchar,
  	"stay_info_note" varchar,
  	"shaping_board_types" varchar,
  	"shaping_lead_time" varchar,
  	"shaping_custom_order" varchar,
  	"spot" varchar,
  	"season" varchar,
  	"contact_address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'owner' NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "builders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sites_id" integer,
  	"media_id" integer,
  	"tenants_id" integer,
  	"users_id" integer,
  	"builders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"builders_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "sites_languages" ADD CONSTRAINT "sites_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_languages_spoken" ADD CONSTRAINT "sites_languages_spoken_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_copy_blocks" ADD CONSTRAINT "sites_copy_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_copy_blocks_locales" ADD CONSTRAINT "sites_copy_blocks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_copy_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_opening_hours_days" ADD CONSTRAINT "sites_opening_hours_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sites_opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_opening_hours" ADD CONSTRAINT "sites_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_price_list" ADD CONSTRAINT "sites_price_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_price_list_locales" ADD CONSTRAINT "sites_price_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_price_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_photos" ADD CONSTRAINT "sites_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_photos" ADD CONSTRAINT "sites_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_photos_locales" ADD CONSTRAINT "sites_photos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_rooms" ADD CONSTRAINT "sites_rooms_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_rooms" ADD CONSTRAINT "sites_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_rooms_locales" ADD CONSTRAINT "sites_rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_lessons_level" ADD CONSTRAINT "sites_lessons_level_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sites_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_lessons" ADD CONSTRAINT "sites_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_lessons_locales" ADD CONSTRAINT "sites_lessons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_credentials" ADD CONSTRAINT "sites_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_credentials_locales" ADD CONSTRAINT "sites_credentials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_rentals" ADD CONSTRAINT "sites_rentals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_rentals_locales" ADD CONSTRAINT "sites_rentals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_rentals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_brands" ADD CONSTRAINT "sites_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_amenities" ADD CONSTRAINT "sites_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_amenities_locales" ADD CONSTRAINT "sites_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_ratings" ADD CONSTRAINT "sites_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_testimonials" ADD CONSTRAINT "sites_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_booking_links" ADD CONSTRAINT "sites_booking_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_booking_links_locales" ADD CONSTRAINT "sites_booking_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_booking_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites" ADD CONSTRAINT "sites_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_locales" ADD CONSTRAINT "sites_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sites_fk" FOREIGN KEY ("sites_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_builders_fk" FOREIGN KEY ("builders_id") REFERENCES "public"."builders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_builders_fk" FOREIGN KEY ("builders_id") REFERENCES "public"."builders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sites_languages_order_idx" ON "sites_languages" USING btree ("order");
  CREATE INDEX "sites_languages_parent_idx" ON "sites_languages" USING btree ("parent_id");
  CREATE INDEX "sites_languages_spoken_order_idx" ON "sites_languages_spoken" USING btree ("order");
  CREATE INDEX "sites_languages_spoken_parent_idx" ON "sites_languages_spoken" USING btree ("parent_id");
  CREATE INDEX "sites_copy_blocks_order_idx" ON "sites_copy_blocks" USING btree ("_order");
  CREATE INDEX "sites_copy_blocks_parent_id_idx" ON "sites_copy_blocks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sites_copy_blocks_locales_locale_parent_id_unique" ON "sites_copy_blocks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_opening_hours_days_order_idx" ON "sites_opening_hours_days" USING btree ("order");
  CREATE INDEX "sites_opening_hours_days_parent_idx" ON "sites_opening_hours_days" USING btree ("parent_id");
  CREATE INDEX "sites_opening_hours_order_idx" ON "sites_opening_hours" USING btree ("_order");
  CREATE INDEX "sites_opening_hours_parent_id_idx" ON "sites_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "sites_price_list_order_idx" ON "sites_price_list" USING btree ("_order");
  CREATE INDEX "sites_price_list_parent_id_idx" ON "sites_price_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sites_price_list_locales_locale_parent_id_unique" ON "sites_price_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_photos_order_idx" ON "sites_photos" USING btree ("_order");
  CREATE INDEX "sites_photos_parent_id_idx" ON "sites_photos" USING btree ("_parent_id");
  CREATE INDEX "sites_photos_image_idx" ON "sites_photos" USING btree ("image_id");
  CREATE UNIQUE INDEX "sites_photos_locales_locale_parent_id_unique" ON "sites_photos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_rooms_order_idx" ON "sites_rooms" USING btree ("_order");
  CREATE INDEX "sites_rooms_parent_id_idx" ON "sites_rooms" USING btree ("_parent_id");
  CREATE INDEX "sites_rooms_photo_idx" ON "sites_rooms" USING btree ("photo_id");
  CREATE UNIQUE INDEX "sites_rooms_locales_locale_parent_id_unique" ON "sites_rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_lessons_level_order_idx" ON "sites_lessons_level" USING btree ("order");
  CREATE INDEX "sites_lessons_level_parent_idx" ON "sites_lessons_level" USING btree ("parent_id");
  CREATE INDEX "sites_lessons_order_idx" ON "sites_lessons" USING btree ("_order");
  CREATE INDEX "sites_lessons_parent_id_idx" ON "sites_lessons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sites_lessons_locales_locale_parent_id_unique" ON "sites_lessons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_credentials_order_idx" ON "sites_credentials" USING btree ("_order");
  CREATE INDEX "sites_credentials_parent_id_idx" ON "sites_credentials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sites_credentials_locales_locale_parent_id_unique" ON "sites_credentials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_rentals_order_idx" ON "sites_rentals" USING btree ("_order");
  CREATE INDEX "sites_rentals_parent_id_idx" ON "sites_rentals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sites_rentals_locales_locale_parent_id_unique" ON "sites_rentals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_brands_order_idx" ON "sites_brands" USING btree ("_order");
  CREATE INDEX "sites_brands_parent_id_idx" ON "sites_brands" USING btree ("_parent_id");
  CREATE INDEX "sites_amenities_order_idx" ON "sites_amenities" USING btree ("_order");
  CREATE INDEX "sites_amenities_parent_id_idx" ON "sites_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sites_amenities_locales_locale_parent_id_unique" ON "sites_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sites_ratings_order_idx" ON "sites_ratings" USING btree ("_order");
  CREATE INDEX "sites_ratings_parent_id_idx" ON "sites_ratings" USING btree ("_parent_id");
  CREATE INDEX "sites_testimonials_order_idx" ON "sites_testimonials" USING btree ("_order");
  CREATE INDEX "sites_testimonials_parent_id_idx" ON "sites_testimonials" USING btree ("_parent_id");
  CREATE INDEX "sites_booking_links_order_idx" ON "sites_booking_links" USING btree ("_order");
  CREATE INDEX "sites_booking_links_parent_id_idx" ON "sites_booking_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sites_booking_links_locales_locale_parent_id_unique" ON "sites_booking_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sites_tenant_idx" ON "sites" USING btree ("tenant_id");
  CREATE INDEX "sites_updated_at_idx" ON "sites" USING btree ("updated_at");
  CREATE INDEX "sites_created_at_idx" ON "sites" USING btree ("created_at");
  CREATE UNIQUE INDEX "sites_locales_locale_parent_id_unique" ON "sites_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "builders_name_idx" ON "builders" USING btree ("name");
  CREATE INDEX "builders_updated_at_idx" ON "builders" USING btree ("updated_at");
  CREATE INDEX "builders_created_at_idx" ON "builders" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_sites_id_idx" ON "payload_locked_documents_rels" USING btree ("sites_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_builders_id_idx" ON "payload_locked_documents_rels" USING btree ("builders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_builders_id_idx" ON "payload_preferences_rels" USING btree ("builders_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "sites_languages" CASCADE;
  DROP TABLE "sites_languages_spoken" CASCADE;
  DROP TABLE "sites_copy_blocks" CASCADE;
  DROP TABLE "sites_copy_blocks_locales" CASCADE;
  DROP TABLE "sites_opening_hours_days" CASCADE;
  DROP TABLE "sites_opening_hours" CASCADE;
  DROP TABLE "sites_price_list" CASCADE;
  DROP TABLE "sites_price_list_locales" CASCADE;
  DROP TABLE "sites_photos" CASCADE;
  DROP TABLE "sites_photos_locales" CASCADE;
  DROP TABLE "sites_rooms" CASCADE;
  DROP TABLE "sites_rooms_locales" CASCADE;
  DROP TABLE "sites_lessons_level" CASCADE;
  DROP TABLE "sites_lessons" CASCADE;
  DROP TABLE "sites_lessons_locales" CASCADE;
  DROP TABLE "sites_credentials" CASCADE;
  DROP TABLE "sites_credentials_locales" CASCADE;
  DROP TABLE "sites_rentals" CASCADE;
  DROP TABLE "sites_rentals_locales" CASCADE;
  DROP TABLE "sites_brands" CASCADE;
  DROP TABLE "sites_amenities" CASCADE;
  DROP TABLE "sites_amenities_locales" CASCADE;
  DROP TABLE "sites_ratings" CASCADE;
  DROP TABLE "sites_testimonials" CASCADE;
  DROP TABLE "sites_booking_links" CASCADE;
  DROP TABLE "sites_booking_links_locales" CASCADE;
  DROP TABLE "sites" CASCADE;
  DROP TABLE "sites_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "users_tenants" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "builders" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_sites_languages";
  DROP TYPE "public"."enum_sites_languages_spoken";
  DROP TYPE "public"."enum_sites_copy_blocks_slot";
  DROP TYPE "public"."enum_sites_opening_hours_days";
  DROP TYPE "public"."enum_sites_price_list_currency";
  DROP TYPE "public"."enum_sites_price_list_unit";
  DROP TYPE "public"."enum_sites_lessons_level";
  DROP TYPE "public"."enum_sites_lessons_currency";
  DROP TYPE "public"."enum_sites_lessons_unit";
  DROP TYPE "public"."enum_sites_rentals_currency";
  DROP TYPE "public"."enum_sites_rentals_unit";
  DROP TYPE "public"."enum_sites_ratings_platform";
  DROP TYPE "public"."enum_sites_ratings_scale";
  DROP TYPE "public"."enum_sites_testimonials_source";
  DROP TYPE "public"."enum_sites_business_type";
  DROP TYPE "public"."enum_users_role";`)
}

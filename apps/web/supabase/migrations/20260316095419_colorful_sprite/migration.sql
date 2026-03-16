CREATE TABLE "component" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "component_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"calorie" real NOT NULL,
	"protein" real NOT NULL,
	"carbs" real NOT NULL,
	"fat" real NOT NULL,
	"is_vegetarian" boolean DEFAULT false NOT NULL,
	"is_halal" boolean DEFAULT false NOT NULL,
	"has_seafood" boolean DEFAULT false NOT NULL,
	"has_lactose" boolean DEFAULT false NOT NULL,
	"has_peanut" boolean DEFAULT false NOT NULL,
	"has_gluten" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "component" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "diet_profile" (
	"user_id" uuid PRIMARY KEY,
	"last_updated" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"calorie_intake" real DEFAULT 0 NOT NULL,
	"carbs_intake" real DEFAULT 0 NOT NULL,
	"protein_intake" real DEFAULT 0 NOT NULL,
	"fat_intake" real DEFAULT 0 NOT NULL,
	"alcohol_intake" real DEFAULT 0 NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "diet_profile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "dish_component_map" (
	"dish_id" integer NOT NULL,
	"component_id" integer NOT NULL,
	"ratio" real DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dish_component_map" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "dish" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dish_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"res_id" integer NOT NULL,
	"price" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dish" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "meal_history" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "meal_history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid,
	"dish_id" integer,
	"at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"edited_carbs" real DEFAULT 0 NOT NULL,
	"edited_protein" real DEFAULT 0 NOT NULL,
	"edited_fat" real DEFAULT 0 NOT NULL,
	"edited_alcohol" real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meal_history" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "restaurant" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "restaurant_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"lat" numeric(9,7),
	"lon" numeric(10,7),
	"url" text NOT NULL,
	"has_dine_in" boolean NOT NULL,
	"has_delivery" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "restaurant" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "restaurant_type_map" (
	"res_id" integer NOT NULL,
	"type_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "restaurant_type_map" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "restaurant_type" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "restaurant_type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "restaurant_type" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY,
	"username" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"dob" date,
	"sex" "sex",
	"weight" real,
	"height" integer,
	"activity_level" real,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"vegetarian_default" boolean DEFAULT false NOT NULL,
	"halal_default" boolean DEFAULT false NOT NULL,
	"no_seafood_default" boolean DEFAULT false NOT NULL,
	"no_lactose_default" boolean DEFAULT false NOT NULL,
	"no_peanut_default" boolean DEFAULT false NOT NULL,
	"gluten_free_default" boolean DEFAULT false NOT NULL,
	"goal" "goal" DEFAULT 'balanced'::"goal" NOT NULL,
	"target_calorie" real,
	"target_fat" real,
	"target_protein" real,
	"target_carbs" real,
	CONSTRAINT "activity_level check" CHECK ("activity_level" IN (1.2, 1.375, 1.55, 1.725, 1.9))
);
--> statement-breakpoint
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "diet_profile" ADD CONSTRAINT "diet_profile_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "dish_component_map" ADD CONSTRAINT "dish_component_map_dish_id_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "dish_component_map" ADD CONSTRAINT "dish_component_map_component_id_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "component"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meal_history" ADD CONSTRAINT "meal_history_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meal_history" ADD CONSTRAINT "meal_history_dish_id_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "restaurant_type_map" ADD CONSTRAINT "restaurant_type_map_res_id_restaurant_id_fkey" FOREIGN KEY ("res_id") REFERENCES "restaurant"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "restaurant_type_map" ADD CONSTRAINT "restaurant_type_map_type_id_restaurant_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "restaurant_type"("id") ON DELETE CASCADE;
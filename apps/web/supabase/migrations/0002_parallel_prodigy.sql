ALTER TABLE "diet_profile" ALTER COLUMN "streak" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "meal_history" ALTER COLUMN "edited_carbs" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "meal_history" ALTER COLUMN "edited_protein" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "meal_history" ALTER COLUMN "edited_fat" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "meal_history" ALTER COLUMN "edited_alcohol" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "target_calorie" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "target_fat" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "target_protein" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "target_carbs" DROP NOT NULL;
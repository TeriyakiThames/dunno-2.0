import ProgressBar from "../Shared/ProgressBar";
import { t, Messages } from "@/lib/internationalisation/i18n-helpers";

interface CalorieGoalsProps {
  calories: number;
  caloriesMax?: number;
  protein: number;
  proteinMax?: number;
  carbs: number;
  carbsMax?: number;
  fats: number;
  fatsMax?: number;
  messages: Messages;
}

export default function CalorieGoals({
  calories = 0,
  caloriesMax = 2200,
  protein = 0,
  proteinMax = 150,
  carbs = 0,
  carbsMax = 220,
  fats = 0,
  fatsMax = 75,
  messages,
}: CalorieGoalsProps) {
  return (
    <div className="mx-4.5 my-6">
      <ProgressBar
        label={t("calories_label", messages)}
        current={calories}
        max={caloriesMax}
        unit="kcal"
        fillColor="bg-green-100"
        trackColor="bg-green-20"
        isMain
      />

      <div className="mt-6">
        <ProgressBar
          label={t("protein_label", messages)}
          current={protein}
          max={proteinMax}
          unit="g"
          fillColor="bg-orange-100"
          trackColor="bg-orange-20"
        />

        <ProgressBar
          label={t("carbs_label", messages)}
          current={carbs}
          max={carbsMax}
          unit="g"
          fillColor="bg-orange-100"
          trackColor="bg-orange-20"
        />

        <ProgressBar
          label={t("fat_label", messages)}
          current={fats}
          max={fatsMax}
          unit="g"
          fillColor="bg-orange-100"
          trackColor="bg-orange-20"
        />
      </div>
    </div>
  );
}

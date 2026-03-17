import { InputHeader } from "@/components/Shared/Input";

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Halal Diet",
  "Lactose Intolerance",
  "Gluten Intolerance",
  "Peanut Allergy",
  "Shellfish Allergy",
];

interface DietaryRestrictionsProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

export default function DietaryRestrictions({
  value = [],
  onChange,
}: DietaryRestrictionsProps) {
  const toggleOption = (option: string) => {
    if (!onChange) return;

    if (value.includes(option)) {
      const updatedArray = value.filter((item) => item !== option);
      onChange(updatedArray);
    } else {
      const updatedArray = [...value, option];
      onChange(updatedArray);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <InputHeader
        header="Dietary Restrictions"
        subheader="Please select all that apply to you."
      />

      <div className="mt-1 flex w-80 flex-wrap gap-4">
        {DIETARY_OPTIONS.map((option) => {
          const isActive = value.includes(option);

          return (
            <button
              type="button"
              key={option}
              onClick={() => toggleOption(option)}
              className={`rounded-[40px] border px-4.5 py-3 text-center text-xs transition-colors ${
                isActive
                  ? "bg-green-10 border-green-100 text-green-100"
                  : "bg-background-1 text-grey-40 border-[#CAE1DD] hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

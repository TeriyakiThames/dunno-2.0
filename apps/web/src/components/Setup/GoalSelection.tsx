import { InputHeader } from "../Shared/Input";
import Image from "next/image";

const GOALS = [
  { id: "balanced", label: "Balanced", icon: "⚖️" },
  { id: "moderate", label: "Moderate", icon: "⚡" },
  { id: "protein", label: "High Protein", icon: "🍗" },
  { id: "keto", label: "Ketogenic", icon: "🍃" },
];

interface GoalSelectionProps {
  value?: string;
  onChange: (value: string) => void; // Changed to expect a single string
  error?: string; // Added error handling to match your other inputs
}

export default function GoalSelection({
  value = "",
  onChange,
  error = "",
}: GoalSelectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <InputHeader header="Select Your Goal" />

      {/* Grid container: 2 columns, specific width, gap between items */}
      <div className="mt-1 grid w-80 grid-cols-2 gap-4 self-center">
        {GOALS.map((item) => {
          const isActive = value === item.id;

          return (
            <button
              type="button" // Prevents the button from submitting the form
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center justify-center rounded-2xl border p-6 transition-colors ${
                isActive
                  ? "bg-green-10 border-green-100 text-green-100"
                  : "text-grey-60 border-[#CAE1DD] bg-white hover:bg-gray-50"
              }`}
            >
              <Image
                src={`/Setup/${item.id}.svg`}
                alt={`${item.label} Icon`}
                width={24}
                height={24}
                className="mb-2"
              />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Error message display matching your Input component */}
      {error && (
        <p className="text-xs leading-3.5 font-normal text-red-100">{error}</p>
      )}
    </div>
  );
}

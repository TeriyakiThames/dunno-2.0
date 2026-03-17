import { t, Messages } from "@/lib/internationalisation/i18n-helpers";
import { Input } from "@/components/Shared/Input";

interface SearchBarProps {
  messages: Messages;
}

// TODO: Add search functionality when backend is complete
export default function SearchBar({ messages }: SearchBarProps) {
  return (
    <>
      <h2 className="mt-6 pb-3 text-center text-xs text-[#8E8E93]">
        {t("search_prompt", messages)}
      </h2>

      <div className="mx-4.5">
        <Input
          placeholder={t("search_placeholder", messages)}
          type={"text"}
          frontImageURL="/Icons/SearchIcon.svg"
        />
      </div>
    </>
  );
}

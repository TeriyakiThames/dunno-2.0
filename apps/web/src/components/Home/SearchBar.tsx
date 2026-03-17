import { t, Messages } from "@/lib/internationalisation/i18n-helpers";
import { Input } from "@/components/Shared/Input";
import { useState, FormEvent } from "react";

interface SearchBarProps {
  messages: Messages;
}

export default function SearchBar({ messages }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    console.log("Executing search for:", searchQuery);
    // TODO: Call backend API here when its done
  };

  return (
    <>
      <h2 className="mt-6 pb-3 text-center text-xs text-[#8E8E93]">
        {t("search_prompt", messages)}
      </h2>

      <form onSubmit={handleSearch} className="mx-4.5">
        <Input
          placeholder={t("search_placeholder", messages)}
          type={"text"}
          frontImageURL="/Icons/SearchIcon.svg"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
}

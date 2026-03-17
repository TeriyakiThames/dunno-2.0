import Image from "next/image";
import { t, Messages } from "@/lib/internationalisation/i18n-helpers";

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

      <div className="mx-4.5 flex h-13 items-center gap-3 rounded-xl border-[0.5px] border-gray-300 bg-white px-5 py-4 transition-colors focus-within:border-green-100">
        <Image
          src="/Icons/SearchIcon.svg"
          alt="Search Icon"
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder={t("search_placeholder", messages)}
          className="w-full bg-transparent text-[#1a1a1a] outline-none placeholder:text-[#b3b3b3]"
        />
      </div>
    </>
  );
}

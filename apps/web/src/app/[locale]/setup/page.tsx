"use client";

import SetupForm from "@/components/Setup/SetupForm";
import SetupHeader from "@/components/Setup/SetupHeader";
import SetupTitle from "@/components/Setup/SetupTitle";
import { Locale } from "@calculories/shared-types";
import { use } from "react";

export default function Setup({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  return (
    <main className="bg-background-10 px-5">
      <SetupTitle locale={locale} />
      <SetupHeader />
      <SetupForm locale={locale} />
    </main>
  );
}

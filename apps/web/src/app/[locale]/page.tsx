import { loadMessages } from "@/lib/internationalisation/i18n";
import HomeClient from "../../components/Home/HomeClient";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "th" }>;
}) {
  const { locale } = await params;

  const messages = loadMessages(
    locale,
    ["TopBar", "Streak", "CalorieGoals", "SmartPicks", "SearchBar"],
    "Home",
  );

  return <HomeClient locale={locale} messages={messages} />;
}

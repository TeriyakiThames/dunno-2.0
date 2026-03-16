"use client";

import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import LocaleSwitcher from "@/components/Shared/LocaleSwitcher";
import AuthButton from "@/components/Shared/AuthButton";
import TopBar from "@/components/Home/TopBar";
import Streak from "@/components/Home/Streak";
import CalorieGoals from "@/components/Home/CalorieGoals";
import SmartPicks from "@/components/Home/SmartPicks";
import SearchBar from "@/components/Home/SearchBar";
import PageBottom from "@/components/Shared/PageBottom";
import {
  Locale,
  Messages,
  GetUserResponse,
  Dish,
} from "@calculories/shared-types";
import DeleteAccountButton from "@/components/Shared/DeleteAccountButton";
import { MockAPI } from "@/mocks/mockAPI";

const MOCK_RECOMMENDED_DISHES: Dish[] = [
  {
    id: 1,
    name_en: "Grilled Salmon",
    name_th: "แซลมอนย่าง",
    price: 210,
    calorie: 450,
    restaurant: { id: 101, name_en: "Green Eats", name_th: "กรีนอีทส์" },
  },
  {
    id: 2,
    name_en: "Quinoa Buddha Bowl",
    name_th: "ควินัวบุดด้าโบลว์",
    price: 185,
    calorie: 380,
    restaurant: { id: 102, name_en: "Healthy Hub", name_th: "เฮลตี้ฮับ" },
  },
  {
    id: 3,
    name_en: "Zucchini Pesto Pasta",
    name_th: "พาสต้าซุกกินีเปสโต",
    price: 240,
    calorie: 520,
    restaurant: { id: 103, name_en: "Pasta Fresh", name_th: "พาสต้าเฟรช" },
  },
];

export default function HomeClient({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const { loading: authLoading, error: authError, user: authUser } = useUser();

  const [appUser, setAppUser] = useState<GetUserResponse | null>(null);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    if (authUser?.id) {
      const fetchDashboardData = async () => {
        setApiLoading(true);
        try {
          const userData = await MockAPI.getUserProfile(authUser.id);
          setAppUser(userData);
        } catch (err) {
          console.error("Failed to fetch user data", err);
        } finally {
          setApiLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [authUser?.id]);

  if (authLoading || apiLoading) {
    return (
      <div className="flex items-center space-x-2 p-4 text-gray-500">
        <span>Loading user data...</span>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="m-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
        <p>Error: {authError.message}</p>
      </div>
    );
  }

  return (
    <main>
      <div className="flex items-center justify-center gap-10 border border-black bg-white">
        <LocaleSwitcher locale={locale} />
        <AuthButton messages={messages} />
        <DeleteAccountButton messages={messages} />
      </div>

      {authUser ? (
        <TopBar
          name={authUser.user_metadata?.name || appUser?.username || "User"}
          imageURL={
            authUser.user_metadata?.avatar_url || "/Home/MockProfilePicture.svg"
          }
          messages={messages}
        />
      ) : (
        <TopBar name={"User"} messages={messages} />
      )}

      {appUser && (
        <>
          <Streak dietProfile={appUser.dietProfile} messages={messages} />
          <CalorieGoals
            user={appUser}
            dietProfile={appUser.dietProfile}
            messages={messages}
          />
          <SmartPicks
            dishes={MOCK_RECOMMENDED_DISHES}
            messages={messages}
            locale={locale}
          />
        </>
      )}

      <SearchBar messages={messages} />
      <PageBottom />
    </main>
  );
}

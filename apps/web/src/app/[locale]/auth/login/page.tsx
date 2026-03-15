import { Suspense } from "react";
import { loadMessages } from "@/lib/internationalisation/i18n";
import LocaleSwitcher from "@/components/Shared/LocaleSwitcher";
import LoginButton from "@/components/Login/LoginButton";

import Image from "next/image";
import { t, Messages } from "@/lib/internationalisation/i18n-helpers";

function LoginHeader({
  locale,
  messages,
}: {
  locale: "en" | "th";
  messages: Messages;
}) {
  return (
    <>
      {/* TODO: Replace with Calculories logo when we get one ... */}
      <Image
        src="/Hedgehog.png"
        width={120}
        height={120}
        alt={"Calculories Logo"}
        className="mx-auto mt-20 mb-9.25 block rounded-full"
      />

      <div className="flex flex-col gap-4.5 text-center font-bold">
        <header>
          <p className="text-primary-green-1">CALCULORIES</p>
          <h1 className="text-text text-[36px] leading-10">
            {t("tagline1", messages)}
            <br />
            <span className="text-primary-green-1">
              {t("tagline2", messages)}
            </span>
          </h1>
        </header>

        <h2 className="text-lg text-[#858585]">{t("tagline3", messages)}</h2>
      </div>
    </>
  );
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: "en" | "th" }>;
}) {
  const { locale } = await params;

  const loginMessages = loadMessages(
    locale,
    ["LoginHeader", "LoginButton"],
    "Login",
  );

  const sharedMessages = loadMessages(
    locale,
    ["AuthButton", "DeleteAccountButton"],
    "Shared",
  );

  const allMessages = { ...sharedMessages, ...loginMessages };

  return (
    <div className="mx-auto max-w-md py-12">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LocaleSwitcher locale={locale} className="absolute top-5 right-5" />
        <LoginHeader locale={locale} messages={allMessages} />
        <LoginButton locale={locale} messages={allMessages} />
      </Suspense>
    </div>
  );
}

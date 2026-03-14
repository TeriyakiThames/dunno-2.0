"use client";

import { use, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import createClient from "@/lib/supabase/client";
import LocaleSwitcher from "@/components/Shared/LocaleSwitcher";

function LoginHeader({ locale }: { locale: "en" | "th" }) {
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
            Choose Better, <br />
            <span className="text-primary-green-1">Faster.</span>
          </h1>
        </header>

        <h2 className="text-lg text-[#858585]">
          Stop overthinking your meals!
        </h2>
      </div>
    </>
  );
}

function LoginButton({ locale }: { locale: "en" | "th" }) {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/${locale}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setError("There was an error logging in with Google. Please try again.");
      console.error("Error logging in with Google:", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-25 mx-auto flex w-[320px] flex-col gap-3">
      <button
        className="bg-primary-green-1 h-16 w-full rounded-2xl px-16 py-2 text-center text-lg font-bold text-white hover:bg-[#6cbcad]"
        onClick={loginWithGoogle}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? "Loading..." : "Continue with Google"}
      </button>

      {error && (
        <p className="text-center text-sm font-semibold text-[#adadad]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function LoginPage({
  params,
}: {
  params: Promise<{ locale: "en" | "th" }>;
}) {
  const { locale } = use(params);

  return (
    <div className="mx-auto max-w-md py-12">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LocaleSwitcher locale={locale} className="absolute top-5 right-5" />
        <LoginHeader locale={locale} />
        <LoginButton locale={locale} />
      </Suspense>
    </div>
  );
}

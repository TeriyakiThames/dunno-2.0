"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import createClient from "@/lib/supabase/client";

export default function LoginPage() {
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
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setError("There was an error logging in with Google. Please try again.");
      console.error("Error loging in with Google:", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">
          Login to your account to continue
        </p>
      </div>

      {error && (
        <div className="rounded-md border px-4 py-3">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          "loading..."
        ) : (
          <div className="flex h-4 border border-red-500">
            <span className="ml-2">Login with Google</span>
          </div>
        )}
      </button>
    </div>
  );
}

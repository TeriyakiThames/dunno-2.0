"use client";

import React, { useEffect } from "react";
import useUser from "@/hooks/useUser";
import AuthButton from "@/components/auth-button";

export default function LoginPage() {
  const { loading, error, user } = useUser();

  useEffect(() => {
    console.log(user); //print user info
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <span>Loading user data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <AuthButton />

      {user ? (
        <>
          <img alt="user avatar" src={user.user_metadata.avatar_url} />
          <div>Email: {user.email}</div>
          <div>name: {user.user_metadata.name}</div>
        </>
      ) : (
        <div>not authenticated</div>
      )}
    </div>
  );
}

import { LOGIN_PATH } from "@/constants/common";
import Link from "next/link";
import React from "react";

export default function AuthErrorPage() {
  return (
    <div>
      <div>Error occured while signing in. Please try logging in again.</div>
      <Link href={"/"}>Go Back to Home Page</Link>
      <br />
      <Link href={LOGIN_PATH}>Login</Link>
    </div>
  );
}

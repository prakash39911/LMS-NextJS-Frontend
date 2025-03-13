import React from "react";
import { auth } from "@clerk/nextjs/server";
import Course from "./Course";

export default async function page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <div className="p-3 text-white">
      <Course />
    </div>
  );
}

import React from "react";
import { auth } from "@clerk/nextjs/server";
import Course from "./Course";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  if (!userId) return redirectToSignIn();

  if (sessionClaims?.metadata.role === "student") redirect("/");

  const name = ((sessionClaims?.metadata.firstName as string) +
    sessionClaims?.metadata.lastName) as string;

  return (
    <div className="p-3 text-white">
      <Course name={name} />
    </div>
  );
}

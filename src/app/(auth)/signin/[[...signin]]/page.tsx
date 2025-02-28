import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="flex vertical-center justify-center items-center">
      <SignIn />
    </div>
  );
}

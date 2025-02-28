import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function page() {
  return (
    <div className="flex vertical-center justify-center items-center">
      <SignUp />
    </div>
  );
}

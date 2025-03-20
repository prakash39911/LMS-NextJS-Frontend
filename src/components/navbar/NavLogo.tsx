"use client";

import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavLogo() {
  const router = useRouter();

  const logo =
    process.env.LOGO_PUBLIC_ID || "Screenshot_2025-03-15_180926_y4zywd";

  return (
    <div className="cursor-pointer" onClick={() => router.push("/")}>
      <CldImage src={logo} width={40} height={40} alt="LMS" />
    </div>
  );
}

"use client";

import { CldImage } from "next-cloudinary";
import React from "react";

export default function NavLogo() {
  const logo =
    process.env.LOGO_PUBLIC_ID || "Screenshot_2025-03-15_180926_y4zywd";

  return (
    <div className="flex gap-1 items-center">
      <CldImage src={logo} width={40} height={40} alt="LMS" />
    </div>
  );
}

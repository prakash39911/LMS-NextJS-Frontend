"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ButtonComponent({
  btnName,
  link,
}: {
  btnName: string;
  link: string;
}) {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push(`${link}`)}>{btnName}</Button>
    </div>
  );
}

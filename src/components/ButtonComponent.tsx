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
      <Button
        className="border border-gray-500 bg-transparent hover:bg-blue-900"
        onClick={() => router.push(`${link}`)}
      >
        {btnName}
      </Button>
    </div>
  );
}

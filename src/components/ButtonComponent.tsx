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
        className="border border-gray-400 bg-gray-600 hover:bg-gray-900"
        onClick={() => router.push(`${link}`)}
      >
        {btnName}
      </Button>
    </div>
  );
}

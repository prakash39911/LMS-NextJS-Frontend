"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { getToken } = useAuth();

  const handleClick = async () => {
    // Use `getToken()` to get the current session token
    const token = await getToken();

    const result = await fetch("http://localhost:8000/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await result.json();

    console.log("fetched data:", data);
  };
  return (
    <div className="text-white flex justify-center items-center vertical-center">
      <Button onClick={() => handleClick()}>Get User Info</Button>
    </div>
  );
}

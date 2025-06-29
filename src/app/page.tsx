import HomePage from "@/components/HomePage";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex items-center justify-center">
      <HomePage userId={userId} />
    </div>
  );
}

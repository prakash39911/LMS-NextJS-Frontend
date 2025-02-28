import React from "react";
import { auth } from "@clerk/nextjs/server";
import ButtonComponent from "../ButtonComponent";
import UserButtonComponent from "../UserButtonComponent";

export default async function Navbar() {
  const { userId } = await auth();

  // const user = await currentUser();

  return (
    <div className="h-14 text-gray-300 border-b-2 border-gray-900 flex justify-between items-center p-2 bg-slate-800">
      <div>LMS</div>
      <div className="flex flex-row gap-2">
        {!userId && (
          <div className="flex flex-row gap-3">
            <ButtonComponent btnName="Signin" link="/signin" />
            <ButtonComponent btnName="SignUp" link="/signup" />
          </div>
        )}
        <UserButtonComponent />
      </div>
    </div>
  );
}

import React from "react";
import { auth } from "@clerk/nextjs/server";
import ButtonComponent from "../ButtonComponent";
import UserButtonComponent from "../UserButtonComponent";
import NavLogo from "./NavLogo";
import HomeButtonComponent from "../HomeButtonComponent";

export default async function Navbar() {
  const { userId } = await auth();

  // const user = await currentUser();

  return (
    <div className="h-14 text-gray-300 flex w-full p-2 bg-gray-900 justify-between items-center border-b-2 border-gray-800">
      <div className="flex gap-3 items-center">
        <NavLogo />
        <HomeButtonComponent />
      </div>
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

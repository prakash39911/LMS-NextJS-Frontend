import React from "react";
import { auth } from "@clerk/nextjs/server";
import ButtonComponent from "../ButtonComponent";
import UserButtonComponent from "../UserButtonComponent";
import NavLogo from "./NavLogo";
import HomeButtonComponent from "../HomeButtonComponent";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-transparent border-b border-gray-700">
      <div className="h-14 text-gray-300 flex w-full p-2 justify-between items-center pl-8">
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
    </div>
  );
}

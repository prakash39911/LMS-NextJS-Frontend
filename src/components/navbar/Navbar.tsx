"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import ButtonComponent from "../ButtonComponent";
import UserButtonComponent from "../UserButtonComponent";
import NavLogo from "./NavLogo";
import HomeButtonComponent from "../HomeButtonComponent";

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-transparent border-b border-gray-700">
      <div className="h-14 text-gray-300 flex w-full p-2 justify-between items-center pl-8">
        <div className="flex gap-3 items-center">
          <NavLogo />
          <HomeButtonComponent />
        </div>
        <div className="flex flex-row gap-2">
          {!isLoaded ? (
            // Loading state - show spinner while Clerk is loading
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
            </div>
          ) : !isSignedIn ? (
            // Not signed in - show signin/signup buttons
            <div className="flex flex-row gap-3">
              <ButtonComponent btnName="Signin" link="/signin" />
              <ButtonComponent btnName="SignUp" link="/signup" />
            </div>
          ) : (
            // Signed in - show user button
            <UserButtonComponent />
          )}
        </div>
      </div>
    </div>
  );
}

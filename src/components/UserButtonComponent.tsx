"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Settings } from "lucide-react";
import React from "react";

export default function UserButtonComponent() {
  return (
    <div>
      <UserButton
        appearance={{
          baseTheme: dark,
          elements: {
            userButtonPopoverActionButton__manageAccount: {
              display: "none", // Hide the default "Manage Account" button
            },
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Manage Account"
            labelIcon={<Settings size={16} />}
            href="/manage-account"
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}

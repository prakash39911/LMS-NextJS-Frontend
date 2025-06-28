"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import React, { createContext, useContext } from "react";

// Define the shape of the context data
interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  userId: string | null | undefined;
  role: "student" | "teacher" | null; // Or whatever your roles are
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider component
export function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();

  // Determine the user's role from their public metadata
  const role = user?.publicMetadata?.role as "student" | "teacher" | null;

  const value = {
    isLoaded,
    isSignedIn,
    userId,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create a custom hook for easy access to the context
export function useClientAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useClientAuth must be used within an ClientAuthProvider");
  }
  return context;
}

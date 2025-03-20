export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      firstName: string;
      lastName: string;
      role: "teacher" | "student";
    };
  }
}

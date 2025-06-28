import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Provider from "@/app/Provider";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "LMS:@prakash",
  description: "Popular Online Courses At Affordable Prices",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`antialiased bg-gray-900`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/app/Provider";
import { dark } from "@clerk/themes";
import Chat from "@/components/chat/Chat";
import { Message } from "@/components/chat/ChatMessage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS:@prakash",
  description: "Popular Online Courses At Affordable Prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialMessages: Message[] = [
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "system",
      timestamp: new Date(Date.now() - 60000 * 5),
    },
  ];
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
        >
          <Provider>{children}</Provider>
          <Chat initialMessages={initialMessages} />
        </body>
      </html>
    </ClerkProvider>
  );
}

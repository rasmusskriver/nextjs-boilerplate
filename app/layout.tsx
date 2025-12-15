import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Deling Platform",
  description: "Del og udforsk professionelle CV'er",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme
            config={{
              colors: {
                primaryColor: "#2563eb",
                secondaryColor: "#9333ea",
              },
              borderRadius: "12px",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {children}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}

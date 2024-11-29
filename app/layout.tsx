import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  style: "normal",
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Repo",
  description: "Find your next contribution on GitHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

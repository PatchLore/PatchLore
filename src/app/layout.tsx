import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Patch Notes Generator",
  description: "Generate hilarious fake patch notes for games or turn your changelog into professional release notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

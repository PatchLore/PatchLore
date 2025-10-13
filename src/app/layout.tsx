import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import PageView from "@/components/PageView";

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
      <body className="antialiased">
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-GW3CZ0VJKJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GW3CZ0VJKJ');
            `,
          }}
        />
        <PageView />
        {children}
      </body>
    </html>
  );
}

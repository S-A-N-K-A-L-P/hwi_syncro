import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PIXEL Platform",
  description: "Project Collaboration Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={
        {
          "--font-geist-sans": "'Geist', system-ui, -apple-system, sans-serif",
          "--font-geist-mono": "'Geist Mono', 'Courier New', monospace",
        } as React.CSSProperties
      }
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

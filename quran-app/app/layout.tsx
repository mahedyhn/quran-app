import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quran Web App",
  description: "Read and search the Holy Quran with interactive features",
  keywords: ["Quran", "Islamic", "Islam", "Arabic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}

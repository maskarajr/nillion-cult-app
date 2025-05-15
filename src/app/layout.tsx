import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nilluminati Accension",
  description: "The Ancient Ones Await Your Presence, Begin Your Sacred Journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

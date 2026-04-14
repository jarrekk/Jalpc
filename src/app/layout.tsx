import type { Metadata } from "next";
import "./globals.css";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Deep Sea Portfolio",
  description: "A mysterious underwater portfolio experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-fixed" id="bg-fixed" />
        <Experience />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

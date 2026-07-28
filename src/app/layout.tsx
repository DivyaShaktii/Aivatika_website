import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIVatika - AI Automation, Made Simple",
  description: "Intelligent chat and invoice automation agents that process documents, handle customer conversations, and coordinate workflows 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid-overlay"></div>
        <div className="glow-overlay"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

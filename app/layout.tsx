import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import ClientSessionProvider from "../context/ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech verse",
  description: "Its awesome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${inter.className} bg-gray-900`} >
        <ClientSessionProvider>
          <Navbar />
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
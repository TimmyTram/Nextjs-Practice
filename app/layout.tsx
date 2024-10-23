import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./context/Provider";
import Navbar from "./components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nextjs Prototype",
  description: "Just a prototype of backend and frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Navbar />
            {children}
        </body>
      </Provider>
    </html>
  );
}

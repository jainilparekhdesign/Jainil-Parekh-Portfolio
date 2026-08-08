import type { Metadata } from "next";
<<<<<<< HEAD
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
=======
import { Geist, Newsreader } from "next/font/google";
>>>>>>> 5f9b7a0b371f50a33f333de98dcae6bc698071a4
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

<<<<<<< HEAD
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

=======
>>>>>>> 5f9b7a0b371f50a33f333de98dcae6bc698071a4
export const metadata: Metadata = {
  title: "Jainil Parekh — Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html
      lang="en"
      className={`${geist.variable} ${newsreader.variable} ${geistMono.variable}`}
    >
=======
    <html lang="en" className={`${geist.variable} ${newsreader.variable}`}>
>>>>>>> 5f9b7a0b371f50a33f333de98dcae6bc698071a4
      <body className="font-geist">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

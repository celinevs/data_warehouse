import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/component/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Warehouse",
  description: "Indomaret",
};

const sidebarItems = [
  { label: "Chart", href: "/chart" },
  { label: "Fact Table", href: "/fact" },
  { label: "Date Table", href: "/date" },
  { label: "Promotions", href: "/promotion" },
  { label: "Inventory", href: "/inventory" },
  { label: "Snapshot", href: "/snapshot" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Sidebar items={sidebarItems}>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}

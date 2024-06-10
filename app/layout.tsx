import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { BottomNavBar } from "@/components/Nav/BottomNavBar";
import { TopNavBar } from "@/components/Nav/TopNavBar";
import Providers from "@/lib/store/redux-provider";
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hail It",
  description: "Your Deliveries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-primary-dark `}>
        <Providers>
          
            <TopNavBar />
            <NextTopLoader showSpinner={false} color="#3B82F6" height={5} speed={400}/>
            
            {children}
            
            <BottomNavBar />
          
        </Providers>
      </body>
    </html>
  );
}

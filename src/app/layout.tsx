import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import NavPage from "@/app/components/Navbar";
import Footer from "./components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin" ,"bengali"],
});


export const metadata: Metadata = {
  title: "বাজার দর",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের বাজারদর এক নজরে।",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="white"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavPage/> 
        {children}
        <Footer/>
        
      </body>
    </html>
  );
}

import { Montserrat } from "next/font/google";
import "./globals.css";
import HomeHeader from "./components/HomeHeader";
import { Toaster } from "react-hot-toast";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Home - Delicious Delivered, Every Meal, Every Time - TastyWheel, Where Flavor Meets Convenience!",
  description: "tastywheel.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeHeader/>
        {children}
        <Toaster position="top-right"/>
        </body>
    </html>
  );
}

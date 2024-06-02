

import AdminHeader from "@/app/components/AdminHeader";
import { Montserrat } from "next/font/google";

import Link from "next/link";
import { Toaster } from "react-hot-toast";


const inter = Montserrat({ subsets: ["latin"], weight:['400'] });

export const metadata = {
  title: "Admin - Delicious Delivered, Every Meal, Every Time - TastyWheel, Where Flavor Meets Convenience!",
  description: "tastywheel.com",
};

export default function RootLayout({ children }) {
  return (
    <div className={`font-montserrat ${inter.className}`}>
      <AdminHeader/>
      <div className="flex px-[10%] mt-5">
        {/* Side Menu */}
        <div className="w-1/4 bg-orange-300 text-[#A3775D] p-4 rounded-md">
          <div className="flex flex-col space-y-4">
            <Link href="/admin">
              <p className="block py-2 px-4 rounded hover:text-[#610F03] hover:px-6 hover:py-2 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Dashboard</p>
            </Link>
            <Link href="/admin/users">
              <p className="block py-2 px-4 rounded hover:text-[#610F03] hover:px-6 hover:py-2 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Manage Users</p>
            </Link>
            <Link href="/admin/category">
              <p className="block py-2 px-4 rounded hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300 text-sm">Manage Categories</p>
            </Link>
            <Link href="/admin/foods">
              <p className="block py-2 px-4 rounded hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Manage Foods</p>
            </Link>
            <Link href="/admin/orders">
              <p className="block py-2 px-4 rounded hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Manage Orders</p>
            </Link>
           
            <Link href="/logout">
              <p className="block py-2 px-4 rounded hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Logout</p>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">{children}
        <Toaster position="bottom-right"/>
        </div>
      </div>
    </div>
  );
}

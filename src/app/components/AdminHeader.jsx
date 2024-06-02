import Link from 'next/link';
import React from 'react';

const AdminHeader = () => {
  return (
    <nav className="bg-[#A3775D] py-2 px-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {/* <img className="h-16" src="https://www.pngall.com/wp-content/uploads/8/Restaurant-Food-PNG-Free-Download.png" alt="Logo" /> */}
          <span className="text-white text-lg font-semibold ml-2">Food Delivery</span>
        </div>

        {/* Navigation links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="#" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Home</Link>
          </li>
          <li>
            <Link href="#" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">About</Link>
          </li>
          <li>
            <Link href="#" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Register</Link>
          </li>
          <li>
            <Link href="#" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminHeader;




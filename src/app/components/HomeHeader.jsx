'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";

const HomeHeader = () => {
  const  [toggle, setToggle] = useState(false)
  const [isLogged, setIsLogged]=useState(false)
  const [user, setUser]=useState('')
  useEffect(() => {
    let checkLogin=async()=>{
      let callApi=await fetch("http://localhost:3000/api/me", {"cache":"no-cache"})
      callApi=await callApi.json()
      setIsLogged(callApi.success)
      if(callApi.success){
        setUser(callApi.user)
      }
    }
    checkLogin();
  
  }, [isLogged])
  
  
 
  return (
    <nav className="bg-[#A3775D] py-2 px-12">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={'/'} className="flex items-center">
          <Image className="" width={90} height={90} src="/images/logo1.png" alt="Logo" />
          <span className="text-[#FBD18A] text-lg font-semibold ml-2">Tasty Wheels</span>
        </Link>
{
  toggle ? 
  <IoMdCloseCircleOutline onClick={()=>setToggle(!toggle)} className='text-[#FBD18A] md:hidden block'size={25}/>
:
< IoMdMenu onClick={()=>setToggle(!toggle)} className='text-[#FBD18A] md:hidden block'size={25}/>


}        {/* Navigation links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Home</Link>
          </li>
         
         
{
  !isLogged && (
    <>
     <li>
            <Link href="/register" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Register</Link>
          </li>
          <li>
            <Link href="/login" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Login</Link>
          </li>
    </>
  )
}
          <li>
            <Link href="/cart" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Cart</Link>
          </li>

        {
          isLogged && (
            <>
            <li>
            <Link href="/myorder" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Order</Link>
          </li>

          <li>
            <Link href="/myorder" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Logout</Link>
          </li>

          <li>
            <Link href="/myorder" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300 capitalize underline">Hii, {user.name}</Link>
          </li>
          </>
          )
        }
        </ul>

        {/* responsive menu  */}

        <ul className={`duration-300 md:hidden w-full h-[86%] flex flex-col items-center justify-start pt-4 space-y-6 space-x-6 fixed bg-[#A3775D] top-[93px]
        ${toggle ? 'left-0':'-left-full'}
        `}>
          <li>
            <Link href="/" className="text-[#FBD18A] p-5 hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Home</Link>
          </li>
          <li>
            <Link href="#" className="text-[#FBD18A] p-5 hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">About</Link>
          </li>
          <li>
            <Link href="/register" className="text-[#FBD18A] p-5 hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Register</Link>
          </li>
          <li>
            <Link href="/login" className="text-[#FBD18A] p-5 hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Login</Link>
          </li>
          <li>
            <Link href="/cart" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Cart</Link>
          </li>
          <li>
            <Link href="/myorder" className="text-[#FBD18A] hover:text-[#610F03] hover:px-6 hover:py-1 hover:rounded-full hover:bg-[#FBD18A] hover:transition-all hover:duration-300">Order</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HomeHeader;


"use client"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    let router=useRouter();
   const handleLoginPage=async (formData)=>{
   let record={
    email:formData.get("email"),
    password:formData.get("password")
   };
   let data=await fetch("http://localhost:3000/api/login", {method:"POST", body:JSON.stringify(record), headers:{"Content-Type":"application/json"}})
   let res=await data.json();
   if(!res.success){
    toast.error(res.msg)
   }if(res.success){

    toast.success("Login Successfully🥳")
    router.push("/")
   }
   }
    return (
        <div>
            <form action={handleLoginPage} method='POST'>
              

                <div className="mb-3 flex flex-col gap-2">
                    <label htmlFor="email" className='text-lg text-[#FBD18A]  font-semibold'>Email</label>
                    <input type="text" className='border px-2 py-2 rounded-sm w-full outline-none bg-orange-50 text-orange-800 font-semibold ' placeholder='Enter Your Email' name='email' id='email' />

                </div>

                <div className="mb-3 flex flex-col gap-2">
                    <label htmlFor="password" className='text-lg text-[#FBD18A]  font-semibold'>Password</label>
                    <input type="text" className='border px-2 py-2 rounded-sm w-full outline-none bg-orange-50 text-orange-800 font-semibold ' placeholder='Enter Your Password' name='password' id='password' />

                </div>



                <div className="mb-3 flex flex-col gap-2">
                    <button type="submit" className=' bg-orange-800 text-orange-200 text-center py-2 px-8 rounded-md shadow-md hover:bg-[#fdc86c] hover:text-orange-800 hover:transition-all hover:duration-300 font-semibold'>Register</button>

                </div>
            </form>

        </div>
    )
}

export default LoginForm

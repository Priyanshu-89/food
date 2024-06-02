"use client"

import { z } from "zod"
import { handleCreateAccount } from "../action"
import { MdPassword } from "react-icons/md"
import toast from "react-hot-toast"

const RegisterForm = () => {
    let registerSchmea = z.object({
        name: z.string({
            required_error: "username is required",
            invalid_type_error: "username must be string"
        }).min(3,{message:"Name is Required"}),

        email: z.string({
            required_error: "email is required",
            invalid_type_error: "email must be string"
        }).email("invalid email format"),

        password: z.string({
            required_error: "password is required",
            invalid_type_error: "password must be string"
        }).min(5, "password must be at least 5 characters").max(12, "password must be at most 12 characters"),

        contact: z.number({
            required_error: "contact is required",
            invalid_type_error: "contact must be a number",
        }).int("contact must be an integer").min(10, { message: "Contact number must be 10 digits long" })
        ,
        
    })
    const handleCreateAcoountClient = async (formData) => {
        let name = formData.get("name");
        let email = formData.get("email");
        let password = formData.get("password");
        let contact = +formData.get("contact");
        let record = { name, email, password, contact }
        let data = registerSchmea.safeParse(record)

        if (!data.success) {
            
            data.error.issues.forEach((issue) => {
               toast.error(issue.path[0] + ":" + issue.message)
            })
            

           

        }else{
            toast.success("User Register Successfully🥳")
        }
       
        await handleCreateAccount(formData)
    }
    return (
        <div>
            <form action={handleCreateAcoountClient} method='POST'>
                <div className="mb-3 flex flex-col gap-2">
                    <label htmlFor="name" className='text-lg text-[#FBD18A]  font-semibold'>Name</label>
                    <input type="text" className='border px-2 py-2 rounded-sm w-full outline-none bg-orange-50 text-orange-800 font-semibold ' placeholder='Enter Your Name' name='name' id='name' />

                </div>

                <div className="mb-3 flex flex-col gap-2">
                    <label htmlFor="contact" className='text-lg text-[#FBD18A]  font-semibold'>Contact Number</label>
                    <input type="text" className='border px-2 py-2 rounded-sm w-full outline-none bg-orange-50 text-orange-800 font-semibold ' placeholder='Enter Your Mobile' name='contact' id='contact' />

                </div>

                <div className="mb-3 flex flex-col gap-2">
                    <label htmlFor="email" className='text-lg text-[#FBD18A]  font-semibold'>Email</label>
                    <input type="text" className='border px-2 py-2 rounded-sm w-full outline-none bg-orange-50 text-orange-800 font-semibold ' placeholder='Enter Your Email' name='email' id='email' />

                </div>

                <div className="mb-3 flex flex-col gap-2">
                    <label htmlFor="password" className='text-lg text-[#FBD18A]  font-semibold'><MdPassword />Password</label>
                    <input type="text" className='border px-2 py-2 rounded-sm w-full outline-none bg-orange-50 text-orange-800 font-semibold ' placeholder='Enter Your Password' name='password' id='password' />

                </div>



                <div className="mb-3 flex flex-col gap-2">
                    <button type="submit" className=' bg-orange-800 text-orange-200 text-center py-2 px-8 rounded-md shadow-md hover:bg-[#fdc86c] hover:text-orange-800 hover:transition-all hover:duration-300 font-semibold'>Register</button>

                </div>
            </form>

        </div>
    )
}

export default RegisterForm

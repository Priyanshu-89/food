import React from 'react'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div>
      <div className="px-14 flex flex-1 justify-center items-center min-h-[80vh]">
       <div className="w-[60%] md:w-1/3">
       
       <div className="p-4 bg-[#A3775D] shadow-md rounded-md">
       <h1 className='text-2xl m-3 text-[#FBD18A] font-semibold mb-3'>Create An Account</h1>
        <RegisterForm/>
        </div>
       </div>
      </div>
    </div>
  )
}

export default RegisterPage

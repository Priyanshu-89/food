import LoginForm from "../components/LoginForm"


const LoginPage = () => {
  return (
    <div>
      <div className="px-14 flex flex-1 justify-center items-center min-h-[80vh]">
       <div className="w-[60%] md:w-1/3">
       
       <div className="p-4 bg-[#A3775D] shadow-md rounded-md">
       <h1 className='text-2xl m-3 text-[#FBD18A] font-semibold mb-3'>Login Here</h1>
        <LoginForm/>
        </div>
       </div>
      </div>
    </div>
  )
}

export default LoginPage


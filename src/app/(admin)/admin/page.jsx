import React from 'react'

const AdminPage = async() => {
   let countData=await fetch("http://localhost:3000/api/count");
   countData=await countData.json()
  return (
    <div className='flex flex-col md:flex-row gap-4 p-5 '>
     <div className="flex-1 bg-[#A3775D] shadow-md text-orange-200  p-5 rounded-lg">
        <h2>{countData.foodCount}</h2>
        <h3>Total Food</h3>
     </div>

     <div className="flex-1 bg-[#A3775D] shadow-md text-orange-200  p-5 rounded-lg">
        <h2>{countData.orderCount}</h2>
        <h3>Total Orders</h3>
     </div>

     <div className="flex-1 bg-[#A3775D] shadow-md text-orange-200  p-5 rounded-lg">
        <h2>{countData.categoryCount}</h2>
        <h3>Total Category</h3>
     </div>

     <div className="flex-1 bg-[#A3775D] shadow-md text-orange-200  p-5 rounded-lg">
        <h2>{countData.userCount}</h2>
        <h3>Total Users</h3>
     </div>
    </div>
  )
}

export default AdminPage

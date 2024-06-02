import Link from 'next/link'
import React from 'react'

const SuccessPage = () => {
  return (
    <div>
       <div className='flex flex-col items-center justify-center my-8'>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="text-3xl text-green-600 mb-3 font-semibold text-center">Wow!</div>
                        <div className="text-lg font-medium text-center mb-3">Your Order Placed Successfully!</div>
                        <Link href={'/myorder'}><p className='bg-orange-700 text-center font-medium text-white px-3 py-1 rounded-sm'>My Order</p></Link>
                    </div>
                </div>
    </div>
  )
}

export default SuccessPage

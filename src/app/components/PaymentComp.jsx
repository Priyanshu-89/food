'use client'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'; // Import Link component from Next.js

const PaymentComp = () => {
    const [orderData, setOrderData] = useState(null); // Initialize orderData state to null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderDataRes = await fetch('http://localhost:3000/api/order/payment', { cache: "no-cache" });
                const orderDataJson = await orderDataRes.json();
                setOrderData(orderDataJson.orderItems);
            } catch (error) {
                console.error('Failed to fetch order data:', error);
            }
        };
        fetchData();
    }, []);

  

    return (
        <>
        orderData {
            <div className="flex flex-col items-center justify-center my-8">
                <h1 className='text-3xl font-semibold mb-4'>Make Payment</h1>
                <div className="w-full max-w-xs">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            {/* Display total payable amount */}
                            <h3 className="text-md font-semibold">Total payable amount: ${1793.60}</h3>
                        </div>
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <h2 className='text-sm my-2 font-semibold'>Select Payment Mode</h2>
                                <Link href={'success'} className='w-full bg-orange-800 text-orange-200 text-center py-2 px-8 rounded-md shadow-md hover:bg-[#A3775D] hover:text-orange-200 hover:transition-all hover:duration-300'>Cash On Delivery</Link>
                                <button disabled className='w-full bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-not-allowed '>Pay Online</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
        
}

export default PaymentComp;

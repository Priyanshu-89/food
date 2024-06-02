'use client'
import { z } from 'zod';
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import { MdOutlineCurrencyRupee } from "react-icons/md";

import { handleCreateAddress } from '../action';

const Checkout = () => {

    //  const [data, setData] = useState({ orderItems: [] })
    let [orderItems, setOrderItems] = useState([]);
    let [refresh, setRefresh] = useState(false)
    let [address, setAddress] = useState([])


    useEffect(() => {
        let callingData = async () => {
            let orderData
            orderData = await fetch("http://localhost:3000/api/order", { cache: "no-cache" })
            let res = await orderData.json()
            // setData(res)
            setOrderItems(res.orderItems)
            // calling user address
            const addressData = await fetch("http://localhost:3000/api/address", { cache: "no-cache" })
            const addressResponse = await addressData.json()
            setAddress(addressResponse.address)
        }
        callingData();
    }, [refresh])





    //discount price

    const actualAmount = orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.foodId.discountPrice * orderItem.quantity;
    }, 0)



    //tax price
    const taxAmount = actualAmount * 0.18;

    //payable amount
    const payableAmount = actualAmount + taxAmount

    let addressSchema = z.object({
        name: z.string(),
        contact: z.number().gte(10, { message: "Contact must be in 10 digit" }),
        area: z.string().min(3).max(50),
        city: z.string().min(3).max(50),
        pincode: z.number().gte(6, { message: "Pincode must be 6 digit" }),
        state: z.string().min(3).max(50),
        landmark: z.string().min(3).max(50),
    })

    const handleAddressClient = async (formData) => {
        formData.set("user", orderItems[0].userId._id)
        let name = formData.get("name");
        let contact = +formData.get("contact");
        let area = formData.get("area");
        let city = formData.get("city");
        let state = formData.get("state");
        let landmark = formData.get("landmark");
        let pincode = +formData.get("pincode");

        let record = { name, contact, area, city, state, landmark, pincode };
        let data = addressSchema.safeParse(record);
        if (!data.success) {

            data.error.issues.forEach((issue) => {
                toast.error(issue.path[0] + ":" + issue.message)
            })

        } else {
            toast.success("Ordered Successfully🥳")
        }

        await handleCreateAddress(formData)
    }

    const handleUpdateAddress = async (address) => {
        let updateAddress = await fetch("http://localhost:3000/api/order", {
            method: "PUT",
            body: JSON.stringify({ address }),
            cache: "no-cache"
        })

        let resAddress = await updateAddress.json();
        if (resAddress.order) {
            toast.success("Address Updated Successfully")
        }
    }

    return (
        <>
            <div className="flex flex-1">
                <h1 className='text-2xl font-semibold text-orange-800'>Checkout</h1>
            </div>

            <div className='flex flex-1'>

                <div className="w-[60%]  h-auto">
                    <div className="flex flex-col gap-1 shadaw border p-3 mb-3">
                        <h2 className='text-lg p-3 text-[#A3775D] font-semibold border-b'>Saved Address</h2>
                        {
                            (address.length > 0) && <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {
                                    address.map((add, i) => (
                                        <div key={i} className="bg-orange-100 flex-1 h-auto p-3">
                                            <div className="max-w-md mx-auto  shadow-md rounded-lg overflow-hidden p-2">
                                                <div className="px-4 py-2">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-lg font-semibold capitalize">{add.name}</h3>
                                                        <input onClick={() => handleUpdateAddress(add._id)} type="radio" name="address" id="address" className='form-radio h-5 w-5 text-blue-500' />
                                                    </div>
                                                </div>
                                                <p className='text-sm text-gray-600 mt-1 capitalize'>{`(+91) ${add.contact}, ${add.area}, ${add.city}, LandMark:-${add.landmark}, ${add.pincode}, ${add.state}`}</p>


                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        {
                            address.length == 0 && <h4 className='text-lg font-semibold text-orange-800'>No Saved Address Yet☹️</h4>
                        }
                    </div>
                    <div className="flex flex-col">

                        <div className="flex flex-col gap-1 shadaw border p-3">
                            <h2 className='text-lg p-3 text-[#A3775D] font-semibold border-b'>Enter Delivery Address Details</h2>
                            <form action={handleAddressClient} method='POST' className='flex flex-col gap-3'>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label htmlFor="name">Full Name</label>
                                        <input type="text" name='name' id='name' className='border w-full px-3 py-2' />
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="contact">Contact Number</label>
                                        <input type="text" name='contact' id='contact' className='border w-full px-3 py-2' />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label htmlFor="area">Street/Village/Area</label>
                                        <input type="text" name='area' id='area' className='border w-full px-3 py-2' />
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="landmark">LandMark</label>
                                        <input type="text" name='landmark' id='landmark' className='border w-full px-3 py-2' />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label htmlFor="city">City</label>
                                        <input type="text" name='city' id='city' className='border w-full px-3 py-2' />
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="state">State</label>
                                        <input type="text" name='state' id='state' className='border w-full px-3 py-2' />
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="pincode">Pincode</label>
                                        <input type="text" name='pincode' id='pincode' className='border w-full px-3 py-2' />
                                    </div>


                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" className='flex-1 items-center gap-1 bg-orange-800 text-orange-200 text-center py-2 px-8 rounded-md shadow-md hover:bg-[#A3775D] hover:text-orange-200 hover:transition-all hover:duration-300'>Save Address</button>
                                    <button type="submit" className='flex-1 bg-[#A3775D] font-medium text-center text-[#FBD18A] px-3 py-2 rounded-md'>Clear</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="w-2/6 m-4">

                    <div className="bg-orange-100 p-4  rounded flex flex-col space-y-2 items-center m-4">
                        {orderItems.map((orderItem, i) => (


                            <div className="w-full" key={i}>
                                <div className="flex md:flex-row flex-col  space-y-1 items-center justify-between ">
                                    <h2 className='text-lg font-semibold text-orange-800 capitalize'>{i + 1}. {orderItem.foodId.title}</h2>
                                    <div className="flex  items-center font-medium">

                                        <p className='font-sm text-orange-700  flex items-center '>{orderItem.quantity}X</p>
                                        <p className='font-sm text-orange-700  flex items-center'>{orderItem.foodId.discountPrice}=</p>
                                        <p className='font-sm text-orange-700  flex items-center'>{orderItem.foodId.discountPrice * orderItem.quantity}</p>
                                    </div>




                                </div>
                            </div>


                        ))
                        }


                        <div className="flex flex-col items-center justify-between text-orange-700 font-semibold">
                            <div className="flex justify-between gap-x-5 font-bold">
                                <h3 className='text-sm md:text-lg'>Total Pay</h3>
                                <h3 className='text-sm md:txt-lg flex items-center'><MdOutlineCurrencyRupee />{payableAmount.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="bg-orange-100  flex  flex-col  p-6">
                        <div className="flex flex-col items-center justify-center text-orange-700 font-semibold">

                            <div className="flex md:flex-row flex-col gap-4 w-full justify-between mt-3">
                                {/* <Link href={'#'} className='bg-[#A3775D] font-medium text-center text-[#FBD18A] px-3 py-2 rounded-md'>Checkout</Link> */}
                                <Link href={'/payment'} className='bg-[#f3b853] text-center font-medium text-[#A3775D] px-3 py-2 rounded-md'>Make Payment</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Checkout


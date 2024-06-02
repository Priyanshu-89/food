'use client'
import Image from 'next/image'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const CartComp = () => {


    let [orderItems, setOrderItems] = useState([]);
    let [refresh, setRefresh] = useState(false)


    useEffect(() => {
        let callingData = async () => {
            let orderData
            orderData = await fetch("http://localhost:3000/api/order", { cache: "no-cache" })
            let res = await orderData.json()

            setOrderItems(res.orderItems)

        }
        callingData();
    }, [refresh])

    const AddMoreQty = async (id) => {
        let data = await fetch(`http://localhost:3000/api/cart/add/${id}`)
        let res = await data.json();
        if (res.success) {
            toast.success(res.message)
            setRefresh(!refresh)
        }
    }

    const AddMinusQty = async (id) => {
        let data = await fetch(`http://localhost:3000/api/cart/minus/${id}`)
        let res = await data.json();
        if (res.success) {
            toast.success(res.message)
            setRefresh(!refresh)
        }
    }

    //for total actual price

    const totalAmount = orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.foodId.price * orderItem.quantity;
    }, 0)

    //discount price

    const actualAmount = orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.foodId.discountPrice * orderItem.quantity;
    }, 0)

    // discount amount
    const totalDiscount = totalAmount - actualAmount

    //tax price
    const taxAmount = actualAmount * 0.18;

    //payable amount
    const payableAmount = actualAmount + taxAmount

    return (
        <>
            <div className="flex flex-1">
                <h1 className='text-2xl font-semibold text-orange-800'>Your Cart - {orderItems.length}</h1>
            </div>

            <div className='flex flex-1'>

                <div className="w-[60%]  h-auto">
                    {
                        orderItems.length < 1 && <h1 className='text-orange-800 text-2xl font-semibold mt-4'>Cart Empty 🥺</h1>
                    }
                    {
                        orderItems.map((orderItem, i) => (
                            <div key={i} className="bg-orange-100 p-4  rounded flex space-y-2 items-center m-4">
                                <div className='w-3/12'>
                                    <Image src={`/images/${orderItem.foodId.coverImage}`} alt='Loading' width={300} height={300} className='w-48' />
                                </div>
                                <div className="w-9/12">
                                    <div className="flex flex-col">
                                        <h2>{orderItem.foodId.title}</h2>
                                        <h2>{orderItem.foodId.category}</h2>
                                        <div className="flex  gap-2 items-center">

                                            <p className='font-medium text-orange-800  flex items-center '> <MdOutlineCurrencyRupee />{orderItem.foodId.discountPrice}</p> <del className='text-orange-300 flex items-center'><MdOutlineCurrencyRupee />{orderItem.foodId.price}/-</del>

                                        </div>
                                        <div className="flex  gap-2 items-center">

                                            <p className='font-medium text-orange-800  flex items-center '>{orderItem.quantity}</p>

                                        </div>
                                        <div className="flex flex-1">
                                            <button type='button' onClick={() => AddMinusQty(orderItem.foodId._id)} className='text-red-600  text-lg font-bold'><CiSquareMinus /></button>
                                            <span className='px-3 py-2 text-2xl'>{orderItem.quantity}</span>
                                            <button type='button' onClick={() => AddMoreQty(orderItem.foodId._id)} className='text-green-600 text-lg font-bold'><CiSquarePlus /></button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className="w-2/6 m-4">
                    <div className="bg-orange-100 border flex  flex-col shadow-md rounded-lg p-6">
                        <div className="flex flex-col items-center justify-center text-orange-700 font-semibold">
                            <h2 className="text-2xl font-semibold mb-2">Price Details</h2>
                            <div className="flex flex-col gap-y-2 w-full">
                                <div className="flex  justify-between">
                                    <h3 className='text-sm'>Total Amount</h3>
                                    <h3 className='txt-lg flex items-center'><MdOutlineCurrencyRupee />{totalAmount.toFixed(2)}</h3>
                                </div>

                                <div className="flex justify-between">
                                    <h3 className='text-sm'>Tax [GST 18%]</h3>
                                    <h3 className='txt-lg flex items-center'><MdOutlineCurrencyRupee />{taxAmount.toFixed(2)}</h3>
                                </div>

                                <div className="flex justify-between ">
                                    <h3 className='text-sm'>Discount</h3>
                                    <h3 className='txt-lg flex items-center'><MdOutlineCurrencyRupee />{totalDiscount.toFixed(2)}</h3>
                                </div>

                                <div className="flex justify-between font-bold">
                                    <h3 className='text-lg'>Total Payable Amount</h3>
                                    <h3 className='txt-lg flex items-center'><MdOutlineCurrencyRupee />{payableAmount.toFixed(2)}</h3>
                                </div>
                            </div>
                            <div className="flex md:flex-row flex-col gap-4 w-full justify-between mt-3">
                                <Link href={'/checkout'} className='bg-[#A3775D] font-medium text-center text-[#FBD18A] px-3 py-2 rounded-md'>Checkout</Link>
                                <Link href={'/'} className='bg-[#f3b853] text-center font-medium text-[#A3775D] px-3 py-2 rounded-md'>More Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartComp

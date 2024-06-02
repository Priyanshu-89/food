import React from 'react';
import Order from '../models/Order';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import OrderItem from '../models/OrderItem';

const MyOrderPage = async () => {
    try {
        let token = cookies().get("token");
        let user = jwt.verify(token.value, "myproject");

        let orders = await Order.find({ userId: user.id, ordered: false });

        let getOrderItems = async (id) => {
            let orderItems = await OrderItem.find({ orderId: id }).populate(["foodId"]);
            return orderItems;
        };

        return (
            <div className="flex justify-center items-center   bg-gray-100">
                <div className=" mx-auto p-8">
                    <h1 className="text-3xl font-semibold text-orange-800 mb-6">My Orders</h1>
                    {orders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {orders.map(async (order) => {
                                let orderItems = await getOrderItems(order._id);

                                return (
                                    <div key={order._id} className="bg-white max-w-[100%] mx-auto rounded-lg shadow-md p-6">
                                        <div className="flex justify-between mb-4">
                                            <span className="text-gray-600">Order ID: {order._id}</span>
                                            <span className="text-gray-600">Date: {new Date(order.dateOfOrder).toLocaleString()}</span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            {orderItems.map((item) => (
                                                <div key={item._id} className="flex items-center border-b pb-4">
                                                    <div className=" relative">
                                                        <Image src={`/images/${item.foodId.coverImage}`} alt="Food Image" width={500} height={500}  className="rounded-md" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h2 className="text-lg font-semibold">{item.foodId.title}</h2>
                                                        <div className="flex items-center space-x-2">
                                                            <p className="text-orange-800 flex items-center font-medium">
                                                                <MdOutlineCurrencyRupee />
                                                                {item.foodId.discountPrice}
                                                            </p>
                                                            <del className="text-gray-500 flex items-center">
                                                                <MdOutlineCurrencyRupee />
                                                                {item.foodId.price}
                                                            </del>
                                                        </div>
                                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                        <p className="text-gray-600">Ingredients: {item.foodId.ingredients}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <span className="text-lg font-semibold">Total Amount: {order.price}</span>
                                            <span className="text-lg font-semibold">Status: {order.status}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <h2 className="text-lg font-semibold text-orange-800 mt-4">No Orders Found</h2>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        // You might want to handle this error, e.g., redirect to login page
        return <div>Error fetching orders. Please try again later.</div>;
    }
};

export default MyOrderPage;

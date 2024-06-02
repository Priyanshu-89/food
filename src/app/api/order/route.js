import Dbconnect from "@/app/db/Connect";
import Order from "@/app/models/Order";
import OrderItem from "@/app/models/OrderItem";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
Dbconnect();
export const GET=async(req, res)=>{
    let token=cookies().get("token")
let user=jwt.verify(token.value, "myproject")
let order
 order=await Order.findOne({userId:user.id, ordered:false});
 if(!order){
    return NextResponse.json({msg:"Order not found"}, {status:400})
 }
 let orderItems=await OrderItem.find({orderId:order._id, userId:user.id}).populate(["foodId", "userId", "orderId"])
 return NextResponse.json({orderItems}, {status:200})
}

export const PUT=async(req)=>{
    let record=await req.json();
    let token=cookies().get("token")
let user=jwt.verify(token.value, "myproject")
let {address}=record
let order
 order=await Order.findOneAndUpdate({userId:user.id, ordered:false}, {address});
 if(!order){
    return NextResponse.json({msg:"Order not found"}, {status:400})
 }

 return NextResponse.json({order})
}
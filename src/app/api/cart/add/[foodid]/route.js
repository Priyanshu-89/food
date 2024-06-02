import Food from "@/app/models/Food";
import Order from "@/app/models/Order";
import OrderItem from "@/app/models/OrderItem";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET=async(req, {params})=>{
    let {foodid}=params;
const food=await Food.findById(foodid);
//when food not found
if(!food){
    return NextResponse.json({message:"Food not found"}, {status:400})
}

let token=cookies().get("token")
let user=jwt.verify(token.value, "myproject")
let order
 order=await Order.findOne({userId:user.id, ordered:false});
if(!order){
   order= await Order.create({userId:user.id, ordered:false}) 
}

let orderitem;
orderitem=await OrderItem.findOne({userId:user.id, foodId:foodid, orderId:order._id})
if(!orderitem){
    orderitem=await OrderItem.create({userId:user.id, foodId:foodid, orderId:order._id})
}else{
    orderitem=await OrderItem.findOneAndUpdate({userId:user.id, foodId:foodid, orderId:order._id},{$inc:{quantity:1}})
}

return NextResponse.json({message:"Food has been added successfully", success:true}, {status:200})
}
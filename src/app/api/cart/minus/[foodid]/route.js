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


let orderitem;
orderitem=await OrderItem.findOne({userId:user.id, foodId:foodid, orderId:order._id})
if(orderitem){
  if(orderitem.quantity>1){
    orderitem=await OrderItem.findOneAndUpdate({userId:user.id, foodId:foodid, orderId:order._id},{$inc:{quantity:-1}})
  }else{
    orderitem=await OrderItem.findOneAndDelete({userId:user.id, foodId:foodid, orderId:order._id})
  }
}

return NextResponse.json({message:"Food quantity updated successfully", success:true}, {status:200})
}
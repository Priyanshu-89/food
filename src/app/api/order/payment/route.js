import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Order from "@/app/models/Order";

export const PUT=async(req)=>{
    let record=await req.json();
    let token=cookies.get("token")
let user=jwt.verify(token.value, "myproject")
let {address}=record
let order
 order=await Order.findOneAndUpdate({userId:user.id, ordered:false}, {address});
 if(!order){
    return NextResponse.json({msg:"Order not found"}, {status:400})
 }

 return NextResponse.json({order})
}
import Dbconnect from "@/app/db/Connect";
import Category from "@/app/models/Category";
import Food from "@/app/models/Food";
import Order from "@/app/models/Order";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
Dbconnect()
export async function GET(req){
    let foodCount=await Food.countDocuments()
    let userCount=await User.countDocuments()
    let orderCount=await Order.countDocuments()
    let categoryCount=await Category.countDocuments()
    return NextResponse.json({foodCount, userCount, orderCount, categoryCount})
}
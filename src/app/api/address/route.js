import Dbconnect from "@/app/db/Connect";
import Address from "@/app/models/Address";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
Dbconnect();
export const GET=async(req, res)=>{
    let token=cookies().get("token")
let user=jwt.verify(token.value, "myproject")

 let address=await Address.find({user:user.id});

return NextResponse.json({address})
}
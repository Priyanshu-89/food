import JWT from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET=async(req)=>{
    let token=cookies().get("token")
    let user;
    if(token){
        user=JWT.verify(token.value, "myproject")
    }else{
        return NextResponse.json({message:"Token not found"}, {status:400})
    }
    if(user && token){
        return NextResponse.json({message:"Logined", user:user, success:true}, {status:200} )
    }else{
        return NextResponse.json({message:"Token not found", success:false}, {status:400})
    }
}
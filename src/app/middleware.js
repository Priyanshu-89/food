import { NextResponse } from "next/server";

export function middleware(request){
    let path=request.nextUrl.pathname;

    let publicpath=path=== "/login" || path === "register";
    let token=request.cookies.get("token")?.value || "";
    if(publicpath && token){
        return NextResponse.redirect(new URL(`${path}`, request.nextUrl))
    }

    if(!publicpath && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
}

export const config={
    matcher:["/myorder", "/cart"]
}
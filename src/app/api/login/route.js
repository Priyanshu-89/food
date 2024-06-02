import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Dbconnect from "@/app/db/Connect";

Dbconnect();

export const POST = async (req) => {
    const records = await req.json();
    let { email, password } = records;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({"msg": "Invalid email address"}, { status: 400 });
        }

        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({"msg": "Invalid Password"}, { status: 400 });
        }

        let tokenData = {
            id: user._id,
            email: user.email,
            name:user.name,
        };
        let token = jwt.sign(tokenData, "myproject", { expiresIn: "5h" });

        const response = NextResponse.json({"msg": "Login Successfully", success: true});
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error) {
        return NextResponse.json({"msg": error.message}, { status: 400 });
    }
};

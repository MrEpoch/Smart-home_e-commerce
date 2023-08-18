import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req , res) {
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/userpage")
    ) {
        const token = req.cookies.get("token");
        if (!token) return NextResponse.redirect("/login");
    }
    
    return NextResponse.next();
}


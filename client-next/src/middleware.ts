import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req , res) {
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/userpage")
    ) {
        const token = req.cookies.get("token");
        if (!token) {
            req.nextUrl.pathname = "/login";
            return NextResponse.redirect(req.nextUrl);
        }    
    }
    
    return NextResponse.next();
}


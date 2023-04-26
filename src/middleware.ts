import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/utilities/auth";

export const middleware = async (request: NextRequest) => {
    const { cookies, nextUrl, url } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    const protectedRoutes = ["/like", "/unlike", "/create", "/follow", "/unfollow"];

    const hasVerifiedToken = token && (await verifyJwtToken(token));

    if (!hasVerifiedToken && protectedRoutes.some((route) => nextUrl.pathname.endsWith(route))) {
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });
    }

    if (hasVerifiedToken && nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home", url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/", "/api/:api*"],
};

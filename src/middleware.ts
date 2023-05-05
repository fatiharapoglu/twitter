import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/utilities/auth";

export const middleware = async (request: NextRequest) => {
    const { cookies, nextUrl, url } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    const protectedRoutes = [
        "/like",
        "/unlike",
        "/follow",
        "/unfollow",
        "/edit",
        "/delete",
        "/retweet",
        "/unretweet",
        "/tweets/create",
    ];
    const staticRoutesPrivate = ["/notifications", "/messages", "/home"];
    const staticRoutesExtendted = ["/notifications", "/messages", "/explore", "/home", "/settings"];

    const hasVerifiedToken = token && (await verifyJwtToken(token));

    if (!hasVerifiedToken && protectedRoutes.some((route) => nextUrl.pathname.endsWith(route))) {
        return NextResponse.redirect(new URL("/not-authorized", url));
    }

    if (!hasVerifiedToken && staticRoutesPrivate.some((route) => nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/", url));
    }

    if (hasVerifiedToken && nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/explore", url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/", "/api/:api*", "/:path*"],
};

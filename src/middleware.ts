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
        "/messages/create",
    ];
    const staticRoutesPrivate = ["/notifications", "/messages", "/home"];

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

    if (
        hasVerifiedToken &&
        (nextUrl.pathname === "/notifications/edit" ||
            nextUrl.pathname === "/messages/edit" ||
            nextUrl.pathname === "/explore/edit" ||
            nextUrl.pathname === "/home/edit" ||
            nextUrl.pathname === "/settings/edit")
    ) {
        const route = nextUrl.pathname.split("/")[1];
        return NextResponse.redirect(new URL(`/${route}`, url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/", "/api/:api*", "/:path*"],
};

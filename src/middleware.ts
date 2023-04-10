import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./utilities/auth";

export const middleware = async (request: NextRequest) => {
    const { url, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    const hasVerifiedToken = token && (await verifyJwtToken(token));

    if (hasVerifiedToken) return NextResponse.redirect(new URL("/home", url));

    return NextResponse.next();
};

export const config = {
    matcher: "/",
};

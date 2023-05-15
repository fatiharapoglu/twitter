import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

import { getJwtSecretKey } from "@/utilities/auth";

export async function POST(request: NextRequest) {
    const token = await request.json();

    console.log(getJwtSecretKey());

    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        return NextResponse.json(payload);
    } catch (error) {
        return NextResponse.json(null);
    }
}

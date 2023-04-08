import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function POST(request: Request) {
    const tweet = await request.json();
    try {
        await prisma.tweet.create({ data: tweet });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

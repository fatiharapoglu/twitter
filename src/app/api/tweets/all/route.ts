import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request) {
    try {
        const tweets = await prisma.tweet.findMany();
        return NextResponse.json({ success: true, tweets });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

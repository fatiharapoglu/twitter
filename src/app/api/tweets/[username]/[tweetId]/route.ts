import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request, { params }: any) {
    try {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id: params.tweetId,
            },
            include: {
                likedBy: true,
            },
        });
        return NextResponse.json({ success: true, tweet });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

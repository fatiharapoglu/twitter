import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request, { params }: any) {
    console.log(params.tweetId);

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

export async function PATCH(request: Request, { params }: any) {
    const { tokenId } = await request.json();

    console.log(params.tweetId);
    try {
        const tweet = await prisma.tweet.update({
            where: {
                id: params.tweetId,
            },
            data: {
                likedBy: {
                    connect: {
                        id: tokenId,
                    },
                },
            },
        });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

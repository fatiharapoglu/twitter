import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function POST(request: Request, { params }: any) {
    const tokenOwnerId = await request.json();

    try {
        await prisma.tweet.update({
            where: {
                id: params.tweetId,
            },
            data: {
                likedBy: {
                    connect: {
                        id: tokenOwnerId,
                    },
                },
            },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

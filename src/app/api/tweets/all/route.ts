import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request) {
    try {
        const tweets = await prisma.tweet.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    },
                },
                likedBy: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
            ],
        });
        return NextResponse.json({ success: true, tweets });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

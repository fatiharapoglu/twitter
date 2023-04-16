import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request) {
    try {
        const tweets = await prisma.tweet.findMany({
            include: {
                author: true,
                likedBy: true,
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

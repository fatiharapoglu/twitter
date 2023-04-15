import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function POST(request: Request) {
    const { authorId, text } = await request.json();

    try {
        await prisma.tweet.create({
            data: {
                text,
                author: {
                    connect: {
                        id: authorId,
                    },
                },
            },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

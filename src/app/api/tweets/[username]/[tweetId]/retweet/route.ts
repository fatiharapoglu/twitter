import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";

export async function POST(request: NextRequest, { params: { tweetId } }: { params: { tweetId: string } }) {
    const tokenOwnerId = await request.json();
    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    if (verifiedToken.id !== tokenOwnerId)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        const retweet = await prisma.retweet.create({
            data: {
                retweetedBy: { connect: { id: tokenOwnerId } },
                tweetOrigin: { connect: { id: tweetId } },
            },
        });
        return NextResponse.json({ success: true, retweet });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

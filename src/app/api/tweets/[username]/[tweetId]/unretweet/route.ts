import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";
import { TweetProps } from "@/types/TweetProps";

export async function POST(request: NextRequest, { params: { tweetId } }: { params: { tweetId: string } }) {
    const tokenOwnerId = await request.json();
    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    if (verifiedToken.id !== tokenOwnerId)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        const originalTweet = await prisma.tweet.findFirst({
            where: {
                id: tweetId,
            },
            include: {
                retweets: true,
            },
        });

        await prisma.tweet.update({
            where: {
                id: tweetId,
            },
            data: {
                retweetedBy: {
                    disconnect: {
                        id: tokenOwnerId,
                    },
                },
            },
        });

        const retweetId = originalTweet?.retweets.find((retweet: any) => retweet.authorId === tokenOwnerId)?.id;

        await prisma.tweet.delete({
            where: {
                id: retweetId,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

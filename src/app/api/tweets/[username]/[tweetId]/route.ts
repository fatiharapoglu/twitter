import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request, { params: { tweetId } }: { params: { tweetId: string } }) {
    try {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id: tweetId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        photoUrl: true,
                    },
                },
                likedBy: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        description: true,
                        followers: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                photoUrl: true,
                            },
                        },
                        photoUrl: true,
                    },
                },
                retweetedBy: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        description: true,
                        followers: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                photoUrl: true,
                            },
                        },
                        photoUrl: true,
                    },
                },
                replies: {
                    select: {
                        authorId: true,
                    },
                },
            },
        });
        return NextResponse.json({ success: true, tweet });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

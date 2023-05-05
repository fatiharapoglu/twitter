import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q");

    if (!query) return NextResponse.json({ success: false, message: "Missing query." });

    try {
        const tweets = await prisma.tweet.findMany({
            where: {
                OR: [
                    {
                        text: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        author: {
                            OR: [
                                {
                                    name: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    username: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                    },
                ],
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
                    },
                },
                retweetedBy: {
                    select: {
                        id: true,
                    },
                },
                retweetOf: {
                    select: {
                        id: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                photoUrl: true,
                            },
                        },
                        authorId: true,
                        createdAt: true,
                        likedBy: {
                            select: {
                                id: true,
                            },
                        },
                        retweetedBy: {
                            select: {
                                id: true,
                            },
                        },
                        photoUrl: true,
                        text: true,
                        isReply: true,
                        repliedTo: {
                            select: {
                                id: true,
                                author: {
                                    select: {
                                        id: true,
                                        username: true,
                                        name: true,
                                        description: true,
                                    },
                                },
                            },
                        },
                        replies: {
                            select: {
                                authorId: true,
                            },
                        },
                    },
                },
                replies: {
                    select: {
                        id: true,
                    },
                },
                repliedTo: {
                    select: {
                        id: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
        return NextResponse.json({ success: true, tweets });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

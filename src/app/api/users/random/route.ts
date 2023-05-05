import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";

export async function GET(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken) return NextResponse.json({ success: false, message: "You are not logged in." });

    const username = verifiedToken.username as string;

    const usersCount = await prisma.user.count({
        where: {
            NOT: {
                photoUrl: null,
            },
            photoUrl: {
                not: "",
            },
        },
    });

    let skip = Math.floor(Math.random() * usersCount);

    if (usersCount - skip < 3) skip = Math.floor(Math.random() * 3);

    try {
        const users = await prisma.user.findMany({
            where: {
                NOT: [
                    {
                        photoUrl: null,
                    },
                    {
                        username: username,
                    },
                    {
                        followers: {
                            some: {
                                username: username,
                            },
                        },
                    },
                ],
                photoUrl: {
                    not: "",
                },
            },
            select: {
                name: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                description: true,
                location: true,
                website: true,
                photoUrl: true,
                headerUrl: true,
                followers: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        description: true,
                        photoUrl: true,
                        followers: {
                            select: {
                                id: true,
                            },
                        },
                        following: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                following: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        description: true,
                        photoUrl: true,
                        followers: {
                            select: {
                                id: true,
                            },
                        },
                        following: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
            skip: skip,
            take: 3,
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json({ success: true, users });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";
import { UserProps } from "@/types/UserProps";

export async function GET(request: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const verifiedToken: UserProps = token && (await verifyJwtToken(token));

    if (!verifiedToken) return NextResponse.json({ success: false, message: "You are not logged in." });

    const username = verifiedToken.username as string;

    const usersCount = await prisma.user.count({
        where: {
            isPremium: true,
            NOT: [
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
        },
    });

    let skip = Math.floor(Math.random() * (usersCount - 3));

    if (skip < 0) skip = 0;

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
                isPremium: true,
                headerUrl: true,
                followers: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        description: true,
                        isPremium: true,
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
                        isPremium: true,
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

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest, { params: { username } }: { params: { username: string } }) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
            select: {
                id: true,
                name: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                description: true,
                location: true,
                website: true,
                isPremium: true,
                photoUrl: true,
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
        });
        return NextResponse.json({ success: true, user });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

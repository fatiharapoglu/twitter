import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request, { params: { username } }: { params: { username: string } }) {
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
            },
        });
        return NextResponse.json({ success: true, user });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function POST(request: Request) {
    const candidate = await request.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: candidate.username,
            },
        });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Username or password is not correct.",
            });
        }
        return NextResponse.json({ success: true, user });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

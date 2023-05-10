import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q");

    if (!query) return NextResponse.json({ success: false, message: "Missing query." });

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: query,
            },
        });

        if (!user) return NextResponse.json({ success: false, message: "User not found." });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

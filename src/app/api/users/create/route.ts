import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function POST(request: Request) {
    const userData = await request.json();

    try {
        await prisma.user.create({ data: userData });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

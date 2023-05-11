import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";

export async function GET(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        await prisma.notification.updateMany({
            where: {
                userId: verifiedToken.id,
            },
            data: {
                isRead: true,
            },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

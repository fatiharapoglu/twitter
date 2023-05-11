import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";

export async function GET(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        const notifications = await prisma.notification.findMany({
            where: {
                userId: verifiedToken.id,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        name: true,
                        photoUrl: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json({ success: true, notifications });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

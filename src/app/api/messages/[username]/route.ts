import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";

export async function GET(request: NextRequest, { params: { username } }: { params: { username: string } }) {
    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    if (verifiedToken.username !== username)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        sender: {
                            username: username,
                        },
                    },
                    {
                        recipient: {
                            username: username,
                        },
                    },
                ],
            },
            orderBy: [
                {
                    createdAt: "asc",
                },
            ],
        });
        return NextResponse.json({ success: true, messages });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";

export async function POST(request: NextRequest) {
    const { recipient, sender, text, photoUrl } = await request.json();

    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    if (verifiedToken.username !== sender)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        const isRecipient = await prisma.user.findUnique({
            where: {
                username: recipient,
            },
        });

        if (!isRecipient) {
            return NextResponse.json({ success: false, message: "Recipient does not exist." });
        }

        await prisma.message.create({
            data: {
                text,
                photoUrl,
                sender: {
                    connect: {
                        username: sender,
                    },
                },
                recipient: {
                    connect: {
                        username: recipient,
                    },
                },
            },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";
import { createNotification } from "@/utilities/fetch";
import { shouldCreateNotification } from "@/utilities/misc/shouldCreateNotification";
import { UserProps } from "@/types/UserProps";

export async function POST(request: NextRequest) {
    const { recipient, sender, text, photoUrl } = await request.json();
    const token = request.cookies.get("token")?.value;
    const verifiedToken: UserProps = token && (await verifyJwtToken(token));
    const secret = process.env.CREATION_SECRET_KEY;

    if (!secret) {
        return NextResponse.json({
            success: false,
            message: "Secret key not found.",
        });
    }

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

        if (recipient !== verifiedToken.username && (await shouldCreateNotification(verifiedToken.username, recipient))) {
            const notificationContent = {
                sender: {
                    username: verifiedToken.username,
                    name: verifiedToken.name,
                    photoUrl: verifiedToken.photoUrl,
                },
                content: null,
            };

            await createNotification(recipient, "message", secret, notificationContent);
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

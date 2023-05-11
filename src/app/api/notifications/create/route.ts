import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { NotificationProps } from "@/types/NotificationProps";

export async function POST(request: NextRequest) {
    const { recipient, type, secret, notificationContent }: NotificationProps = await request.json();

    if (secret !== process.env.CREATION_SECRET_KEY) {
        return NextResponse.json({ success: false, error: "Invalid secret." });
    }

    try {
        await prisma.notification.create({
            data: {
                user: {
                    connect: {
                        username: recipient,
                    },
                },
                type: type,
                content: JSON.stringify(notificationContent),
            },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

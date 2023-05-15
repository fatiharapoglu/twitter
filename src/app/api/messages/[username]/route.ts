import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";
import { UserProps } from "@/types/UserProps";

export async function GET(request: NextRequest, { params: { username } }: { params: { username: string } }) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const verifiedToken: UserProps = token && (await verifyJwtToken(token));

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
            include: {
                sender: {
                    select: {
                        name: true,
                        username: true,
                        photoUrl: true,
                        isPremium: true,
                    },
                },
                recipient: {
                    select: {
                        name: true,
                        username: true,
                        photoUrl: true,
                        isPremium: true,
                    },
                },
            },
            orderBy: [
                {
                    createdAt: "asc",
                },
            ],
        });

        const conversations: any = {};

        messages.forEach((message: any) => {
            const sender = message.sender.username;
            const recipient = message.recipient.username;
            const conversationKey = [sender, recipient].sort().join("-");

            if (!conversations.hasOwnProperty(conversationKey)) {
                conversations[conversationKey] = {
                    participants: [sender, recipient],
                    messages: [],
                };
            }

            conversations[conversationKey].messages.push(message);
        });

        const formattedConversations = Object.values(conversations);

        formattedConversations.sort((a: any, b: any) => {
            const lastMessageA = a.messages[a.messages.length - 1];
            const lastMessageB = b.messages[b.messages.length - 1];

            if (lastMessageA.createdAt > lastMessageB.createdAt) {
                return -1;
            } else if (lastMessageA.createdAt < lastMessageB.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });

        return NextResponse.json({ success: true, formattedConversations });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

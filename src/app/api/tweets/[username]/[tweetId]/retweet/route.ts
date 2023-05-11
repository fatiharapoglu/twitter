import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";
import { createNotification } from "@/utilities/fetch";
import { UserProps } from "@/types/UserProps";

export async function POST(
    request: NextRequest,
    { params: { tweetId, username } }: { params: { tweetId: string; username: string } }
) {
    const tokenOwnerId = await request.json();
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

    if (verifiedToken.id !== tokenOwnerId)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        await prisma.tweet.update({
            where: {
                id: tweetId,
            },
            data: {
                retweetedBy: {
                    connect: {
                        id: tokenOwnerId,
                    },
                },
            },
        });
        await prisma.tweet.create({
            data: {
                isRetweet: true,
                text: "",
                author: {
                    connect: {
                        id: tokenOwnerId,
                    },
                },
                retweetOf: {
                    connect: {
                        id: tweetId,
                    },
                },
            },
        });

        if (username !== verifiedToken.username) {
            const notificationContent = {
                sender: {
                    username: verifiedToken.username,
                    name: verifiedToken.name,
                    photoUrl: verifiedToken.photoUrl,
                },
                content: {
                    id: tweetId,
                },
            };

            await createNotification(username, "retweet", secret, notificationContent);
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

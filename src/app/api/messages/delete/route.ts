import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/prisma/client";
import { verifyJwtToken } from "@/utilities/auth";
import { UserProps } from "@/types/UserProps";

export async function POST(request: NextRequest) {
    const { tokenOwnerId, participants }: { tokenOwnerId: string; participants: string[] } = await request.json();

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const verifiedToken: UserProps = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    if (verifiedToken.id !== JSON.parse(tokenOwnerId))
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        await prisma.message.deleteMany({
            where: {
                OR: [
                    {
                        sender: {
                            username: participants[0],
                        },
                        recipient: {
                            username: participants[1],
                        },
                    },
                    {
                        sender: {
                            username: participants[1],
                        },
                        recipient: {
                            username: participants[0],
                        },
                    },
                ],
            },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

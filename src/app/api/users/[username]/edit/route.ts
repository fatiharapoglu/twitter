import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

import { prisma } from "@/prisma/client";
import { getJwtSecretKey, verifyJwtToken } from "@/utilities/auth";

export async function POST(request: NextRequest, { params: { username } }: { params: { username: string } }) {
    const data = await request.json();
    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (!verifiedToken)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    if (verifiedToken.username !== username)
        return NextResponse.json({ success: false, message: "You are not authorized to perform this action." });

    try {
        const user = await prisma.user.update({
            where: {
                username: username,
            },
            data: data,
        });

        const newToken = await new SignJWT({
            id: user.id,
            username: user.username,
            name: user.name,
            description: user.description,
            location: user.location,
            website: user.website,
            createdAt: user.createdAt,
            photoUrl: user.photoUrl,
            headerUrl: user.headerUrl,
        })
            .setProtectedHeader({
                alg: "HS256",
            })
            .setIssuedAt()
            .setExpirationTime("1d")
            .sign(getJwtSecretKey());

        const response = NextResponse.json({
            success: true,
        });
        response.cookies.set({
            name: "token",
            value: newToken,
            path: "/",
        });

        return response;
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

import { NextResponse } from "next/server";
import { SignJWT } from "jose";

import { prisma } from "@/prisma/client";
import { comparePasswords } from "@/utilities/bcrypt";
import { getJwtSecretKey } from "@/utilities/auth";

export async function POST(request: Request) {
    const { username, password } = await request.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Username or password is not correct.",
            });
        }

        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Username or password is not correct.",
            });
        }

        const token = await new SignJWT({
            id: user.id,
            username: user.username,
            name: user.name,
            createdAt: user.createdAt,
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
            value: token,
            path: "/",
        });

        return response;
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

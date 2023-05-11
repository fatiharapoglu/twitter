import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

import { prisma } from "@/prisma/client";
import { hashPassword } from "@/utilities/bcrypt";
import { getJwtSecretKey } from "@/utilities/auth";
import { createNotification } from "@/utilities/fetch";

export async function POST(request: NextRequest) {
    const userData = await request.json();
    const hashedPassword = await hashPassword(userData.password);
    const secret = process.env.CREATION_SECRET_KEY;

    if (!secret) {
        return NextResponse.json({
            success: false,
            message: "Secret key not found.",
        });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                username: userData.username,
            },
        });

        if (userExists) {
            return NextResponse.json({
                success: false,
                message: "Username already exists.",
            });
        }

        const newUser = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        await createNotification(newUser.username, "welcome", secret);

        const token = await new SignJWT({
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
            description: newUser.description,
            location: newUser.location,
            website: newUser.website,
            isPremium: newUser.isPremium,
            createdAt: newUser.createdAt,
            photoUrl: newUser.photoUrl,
            headerUrl: newUser.headerUrl,
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

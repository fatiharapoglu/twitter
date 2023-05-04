import { NextResponse } from "next/server";
import { SignJWT } from "jose";

import { prisma } from "@/prisma/client";
import { hashPassword } from "@/utilities/bcrypt";
import { getJwtSecretKey } from "@/utilities/auth";

export async function POST(request: Request) {
    const userData = await request.json();
    const hashedPassword = await hashPassword(userData.password);

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

        const token = await new SignJWT({
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
            description: newUser.description,
            location: newUser.location,
            website: newUser.website,
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

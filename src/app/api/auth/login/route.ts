import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { comparePasswords } from "@/utilities/bcrypt";

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
        return NextResponse.json({ success: true, user });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

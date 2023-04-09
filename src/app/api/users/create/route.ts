import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { hashPassword } from "@/utilities/bcrypt";

export async function POST(request: Request) {
    const userData = await request.json();
    const hashedPassword = await hashPassword(userData.password);

    try {
        await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}

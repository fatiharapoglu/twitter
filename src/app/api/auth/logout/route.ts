import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const response = new NextResponse();
    response.cookies.delete("token");
    return response;
}

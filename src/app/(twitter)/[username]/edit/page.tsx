"use client";

import { useContext } from "react";

import { AuthContext } from "../../layout";
import CircularLoading from "@/components/misc/CircularLoading";
import EditProfile from "@/components/user/EditProfile";
import BackToArrow from "@/components/misc/BackToArrow";

export default function EditPage({ params: { username } }: { params: { username: string } }) {
    const { token, isPending, refreshToken } = useContext(AuthContext);

    if (isPending) return <CircularLoading />;

    if (!token) throw new Error("You must be logged in to view this page");
    if (username !== token.username) throw new Error("You are not authorized to view this page");

    return (
        <div>
            <BackToArrow title={username} url={`/${username}`} />
            <EditProfile profile={token} refreshToken={refreshToken} />
        </div>
    );
}

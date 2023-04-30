"use client";

import { useContext } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import { AuthContext } from "../../layout";
import CircularLoading from "@/components/misc/CircularLoading";
import EditProfile from "@/components/user/EditProfile";

export default function EditPage({ params: { username } }: { params: { username: string } }) {
    const { token, isPending } = useContext(AuthContext);

    if (isPending) return <CircularLoading />;

    if (!token) throw new Error("You must be logged in to view this page");
    if (username !== token.username) throw new Error("You are not authorized to view this page");

    return (
        <div>
            <div className="back-to">
                <Link className="icon-hoverable" href={`/${username}`}>
                    <FaArrowLeft />
                </Link>
                <div className="top">
                    <span className="top-title">{username}</span>
                </div>
            </div>
            <EditProfile profile={token} />
        </div>
    );
}

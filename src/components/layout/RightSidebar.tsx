"use client";

import { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "@/app/(twitter)/layout";
import Search from "../misc/Search";
import WhoToFollow from "../misc/WhoToFollow";
import CompleteProfileReminder from "../misc/CompleteProfileReminder";

export default function RightSidebar() {
    const { token, isPending } = useContext(AuthContext);

    return (
        <aside className="right-sidebar">
            <div className="fixed">
                <Search />
                {token && <WhoToFollow />}
                {token && <CompleteProfileReminder token={token} />}
                {!isPending && !token && (
                    <div className="reminder">
                        <h1>Don’t miss what’s happening</h1>
                        <div>
                            <Link href="/" className="btn btn-white">
                                Log In
                            </Link>
                            <Link href="/" className="btn btn-dark">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}

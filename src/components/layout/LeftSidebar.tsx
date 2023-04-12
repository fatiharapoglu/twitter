"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@mui/material";

import useAuth from "@/hooks/useAuth";

export default function LeftSidebar() {
    const auth = useAuth();
    const tempIsLocked = false;

    return (
        <aside className="left-sidebar">
            <Image src="/assets/favicon.png" alt="" width={50} height={50} />
            <nav>
                <ul>
                    <li>
                        <Link href="/home">Home</Link>
                    </li>
                    <li>
                        <Link href="/explore">Explore</Link>
                    </li>
                    {auth.token && (
                        <>
                            <li>
                                <Link href="/notifications">Notifications</Link>
                            </li>
                            <li>
                                <Link href="/messages">Messages</Link>
                            </li>
                            <li>
                                <Link href="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link href="/settings">Settings</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {auth.token && (
                <>
                    <div>
                        <button className="btn">Tweet</button>
                    </div>
                    <div>
                        <div>
                            <Avatar alt="" src="https://picsum.photos/200/300" />
                            <p>{auth.token.name}</p>
                            <p>@{auth.token.username}</p>
                            <p>{tempIsLocked ? "lock image" : "none"}</p>
                        </div>
                        <div>
                            <button onClick={auth.logout} className="btn">
                                Log Out
                            </button>
                            <p>
                                <Link href="/profile">Go to profile</Link>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </aside>
    );
}

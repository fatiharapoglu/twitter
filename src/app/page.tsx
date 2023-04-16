"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import SignUpDialog from "@/components/dialog/SignUpDialog";
import LogInDialog from "@/components/dialog/LogInDialog";
import { logInAsTest } from "@/utilities/fetch";

export default function RootPage() {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLogInOpen, setIsLogInOpen] = useState(false);

    const router = useRouter();

    const handleSignUpClick = () => {
        setIsSignUpOpen(true);
    };
    const handleSignUpClose = () => {
        setIsSignUpOpen(false);
    };
    const handleLogInClick = () => {
        setIsLogInOpen(true);
    };
    const handleLogInClose = () => {
        setIsLogInOpen(false);
    };

    return (
        <>
            <main className="root">
                <div className="root-left">
                    <Image src="/assets/root.png" alt="" fill />
                    <div className="root-left-logo">
                        <Image src="/assets/favicon-white.png" alt="" width={140} height={140} />
                    </div>
                </div>
                <div className="root-right">
                    <Image src="/assets/favicon.png" alt="" width={40} height={40} />
                    <h1>See what&apos;s happening in the world right now</h1>
                    <p>Join Twitter today.</p>
                    <div className="button-group">
                        <button className="btn" onClick={handleSignUpClick}>
                            Create account
                        </button>
                        <button className="btn btn-light" onClick={handleLogInClick}>
                            Sign in
                        </button>
                        <Tooltip
                            title="You can log in as test account to get full user priviliges if you don't have time to sign up. You can ALSO just look around without even being logged in, just like real Twitter!"
                            placement="bottom"
                        >
                            <button
                                onClick={async () => {
                                    const json = await logInAsTest();
                                    if (!json.success) return alert("Something went wrong. Try again.");
                                    // snackbar here
                                    router.push("/home");
                                }}
                                className="btn btn-light"
                            >
                                <span>Test account (Hover here!)</span>
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </main>
            <SignUpDialog open={isSignUpOpen} handleSignUpClose={handleSignUpClose} />
            <LogInDialog open={isLogInOpen} handleLogInClose={handleLogInClose} />
            <Link className="fixed-link text-muted" href="/home">
                Explore without signing in <FaArrowRight />
            </Link>
        </>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";

import SignUpDialog from "@/components/root/SignUpDialog";
import LogInDialog from "@/components/root/LogInDialog";

export default function RootPage() {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLogInOpen, setIsLogInOpen] = useState(false);

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
                        <button className="btn btn-light">
                            Test account <span>(?)</span>
                        </button>
                    </div>
                </div>
            </main>
            <SignUpDialog open={isSignUpOpen} handleSignUpClose={handleSignUpClose} />
            <LogInDialog open={isLogInOpen} handleLogInClose={handleLogInClose} />
        </>
    );
}

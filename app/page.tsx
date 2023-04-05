"use client";

import { useState } from "react";
import Image from "next/image";

import SignUpDialog from "@/components/homepage/SignUpDialog";
import LogInDialog from "@/components/homepage/LogInDialog";

export default function Home() {
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
            <main className="homepage">
                <div className="homepage-left">
                    <Image src="/assets/homepage.jpg" alt="" fill />
                    <div className="homepage-left-logo">
                        <Image src="/assets/favicon.png" alt="" width={120} height={120} />
                    </div>
                </div>
                <div className="homepage-right">
                    <Image src="/assets/favicon.png" alt="" width={50} height={50} />
                    <h1>See what&apos;s happening in the world right now</h1>
                    <p>Join Twitter today.</p>
                    <div className="button-group">
                        <button className="btn" onClick={handleSignUpClick}>
                            Sign Up
                        </button>
                        <button className="btn btn-light" onClick={handleLogInClick}>
                            Log In
                        </button>
                        <button className="btn btn-light">
                            Test Account <span>(?)</span>
                        </button>
                    </div>
                </div>
            </main>
            <SignUpDialog open={isSignUpOpen} handleSignUpClose={handleSignUpClose} />
            <LogInDialog open={isLogInOpen} handleLogInClose={handleLogInClose} />
        </>
    );
}

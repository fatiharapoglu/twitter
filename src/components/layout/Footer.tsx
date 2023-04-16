"use client";

import Link from "next/link";

import useAuth from "@/hooks/useAuth";

export default function Footer() {
    const auth = useAuth();

    if (auth.isPending) return null;

    return (
        <>
            {!auth.token && (
                <footer className="footer">
                    <div>
                        <h1>Don’t miss what’s happening</h1>
                        <p>People on Twitter are the first to know.</p>
                    </div>
                    <div>
                        <Link href="/" className="btn ">
                            Log In
                        </Link>
                        <Link href="/" className="btn btn-light">
                            Sign Up
                        </Link>
                    </div>
                </footer>
            )}
        </>
    );
}

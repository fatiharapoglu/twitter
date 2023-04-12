"use client";

import Link from "next/link";

export default function Footer() {
    return (
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
    );
}

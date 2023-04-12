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
                <Link href="/" className="btn">
                    Sign Up
                </Link>
                <Link href="/" className="btn btn-light">
                    Log In
                </Link>
            </div>
        </footer>
    );
}

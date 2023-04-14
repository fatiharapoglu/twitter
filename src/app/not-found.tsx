"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="error-not-found">
            <Image src="/assets/favicon-white.png" alt="" width={75} height={75} />
            <h1>Sorry, that page doesn&apos;t exist!</h1>
            <Link href="/">Return to the homepage</Link>
        </div>
    );
}

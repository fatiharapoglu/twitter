"use client";

import Image from "next/image";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="error-global">
            <Image src="/assets/favicon-white.png" alt="" width={75} height={75} />
            <h1>Something went wrong!</h1>
            <button className="btn btn-dark" onClick={() => reset()}>
                Try again
            </button>
        </div>
    );
}

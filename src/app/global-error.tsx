"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <html>
            <body>
                <div className="error-global">
                    <h2>Something went wrong!</h2>
                    <button className="btn btn-dark" onClick={() => reset()}>
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}

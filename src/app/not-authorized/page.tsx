import Image from "next/image";

export default function AuthErrorPage() {
    return (
        <div className="error-global">
            <Image src="/assets/favicon-white.png" alt="" width={75} height={75} />
            <h1>You are not authorized to view this page.</h1>
            <a href="/">Return to the homepage</a>
        </div>
    );
}

import Image from "next/image";
import Link from "next/link";

export default function LeftSidebar() {
    return (
        <aside className="left-sidebar">
            <Image src="/assets/favicon.png" alt="" width={50} height={50} />
            <nav>
                <ul>
                    <li>
                        <Link href="/home">Home</Link>
                    </li>
                    <li>
                        <Link href="/explore">Explore</Link>
                    </li>
                    <li>
                        <Link href="/notifications">Notifications</Link>
                    </li>
                    <li>
                        <Link href="/messages">Messages</Link>
                    </li>
                    <li>
                        <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link href="/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <button>Tweet</button>
            </div>
            <div>
                <div>
                    <p>PP</p>
                    <p>fettan</p>
                    <p>@Fettan</p>
                    <p>isLocked?</p>
                </div>
                <div>
                    <p>Log Out</p>
                    <p>Go to profile</p>
                </div>
            </div>
        </aside>
    );
}

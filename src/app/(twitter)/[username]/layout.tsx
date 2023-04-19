import { notFound } from "next/navigation";

import Profile from "@/components/layout/Profile";
import { getUser } from "@/utilities/fetch";

export default async function ProfileLayout({
    children,
    params: { username },
}: {
    children: React.ReactNode;
    params: { username: string };
}) {
    const { user } = await getUser(username);

    if (!user) {
        notFound();
    }

    return (
        <div className="profile-layout">
            {<Profile username={username} profile={user} />}
            {children}
        </div>
    );
}

import { notFound } from "next/navigation";

import Profile from "@/components/layout/Profile";
import { getUser } from "@/utilities/fetch";

export default async function ProfileLayout({ children, params }: { children: React.ReactNode; params: any }) {
    const { user } = await getUser(params.username);

    if (!user) {
        notFound();
    }

    return (
        <div className="profile-layout">
            {<Profile params={params} profile={user} />}
            {children}
        </div>
    );
}

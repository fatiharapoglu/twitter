"use client";

import { useQuery } from "@tanstack/react-query";

import NotFound from "@/app/not-found";
import Profile from "@/components/user/Profile";
import CircularLoading from "@/components/misc/CircularLoading";
import { getUser } from "@/utilities/fetch";

export default function ProfileLayout({
    children,
    params: { username },
}: {
    children: React.ReactNode;
    params: { username: string };
}) {
    const { isLoading, data } = useQuery({
        queryKey: ["users", username],
        queryFn: () => getUser(username),
    });

    if (!isLoading && !data.user) return NotFound();

    return (
        <div className="profile-layout">
            {isLoading ? <CircularLoading /> : <Profile profile={data.user} />}
            {children}
        </div>
    );
}

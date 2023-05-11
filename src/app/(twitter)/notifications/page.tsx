"use client";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { AuthContext } from "../layout";
import { getNotifications } from "@/utilities/fetch";
import CircularLoading from "@/components/misc/CircularLoading";
import NothingToShow from "@/components/misc/NothingToShow";
import { NotificationProps } from "@/types/NotificationProps";
import Notification from "@/components/misc/Notification";

export default function NotificationsPage() {
    const { token, isPending } = useContext(AuthContext);

    const { isLoading, data, isFetched } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotifications(),
    });

    if (isPending || !token || isLoading) return <CircularLoading />;

    return (
        <main>
            <h1 className="page-name">Notifications</h1>
            {isFetched && data.notifications.length === 0 ? (
                <NothingToShow />
            ) : (
                <div className="notifications-wrapper">
                    {data.notifications.map((notification: NotificationProps) => (
                        <Notification key={notification.id} notification={notification} />
                    ))}
                </div>
            )}
        </main>
    );
}

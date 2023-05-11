import { NotificationProps } from "@/types/NotificationProps";

export default function Notification({ notification }: { notification: NotificationProps }) {
    return <div className="notification">{notification.id}</div>;
}

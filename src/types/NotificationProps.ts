export type NotificationProps = {
    recipient: string;
    type: NotificationTypes;
    secret: string;
    id: string;
};

export type NotificationTypes = "welcome" | "follow" | "like" | "reply" | "message";

import { prisma } from "@/prisma/client";

export const shouldCreateNotification = async (sender: string, recipient: string) => {
    const lastNotification = await prisma.notification.findFirst({
        where: {
            type: "message",
            user: {
                username: recipient,
            },
            content: {
                contains: sender,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (!lastNotification) return true;

    const currentTime = Date.now();
    const lastNotificationTime = new Date(lastNotification.createdAt).getTime();
    const oneHour = 60 * 60 * 1000;

    if (currentTime - lastNotificationTime >= oneHour) {
        return true;
    }

    return false;
};

// this function determines if enough time is passed to create notification while messaging

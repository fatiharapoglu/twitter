import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { UserProps } from "@/types/UserProps";
import { getNotifications } from "@/utilities/fetch";
import { NotificationProps } from "@/types/NotificationProps";

export default function UnreadNotificationsBadge({ token }: { token: UserProps }) {
    const { data, isFetched } = useQuery(["notifications"], getNotifications);

    const lengthOfUnreadNotifications =
        token && isFetched && data.notifications.filter((notification: NotificationProps) => !notification.isRead).length;

    const animationVariants = {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0 },
    };

    return (
        <>
            {lengthOfUnreadNotifications > 0 && (
                <motion.span className="badge" variants={animationVariants} initial="initial" animate="animate" exit="exit">
                    {lengthOfUnreadNotifications}
                </motion.span>
            )}
        </>
    );
}

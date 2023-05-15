import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getNotifications } from "@/utilities/fetch";
import { NotificationProps } from "@/types/NotificationProps";

export default function UnreadNotificationsBadge() {
    const { data } = useQuery(["notifications"], getNotifications);

    const lengthOfUnreadNotifications =
        data?.notifications?.filter((notification: NotificationProps) => !notification.isRead)?.length ?? 0;

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

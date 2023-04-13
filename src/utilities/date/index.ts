import { formatDistanceToNowStrict } from "date-fns";

export const formatDate = (date: Date) => {
    const tweetDate = new Date(date);
    const diffInSeconds = Math.floor((Date.now() - tweetDate.getTime()) / 1000);

    if (diffInSeconds > 86400) {
        // (24 hours)
        const formattedDate = tweetDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
        });
        return formattedDate;
    }

    const timeDistance = formatDistanceToNowStrict(tweetDate);
    return timeDistance;
};

export const formatDateExtended = (date: Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
};

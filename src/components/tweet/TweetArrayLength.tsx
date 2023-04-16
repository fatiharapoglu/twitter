import { useQuery } from "@tanstack/react-query";

import { getUserTweets } from "@/utilities/fetch";

export default function TweetArrayLength({ username }: { username: string }) {
    const { isFetched, data } = useQuery({
        queryKey: ["tweets", username],
        queryFn: () => getUserTweets(username),
    });

    return <span className="text-muted">{isFetched ? data.tweets?.length : "0"} Tweets</span>;
}

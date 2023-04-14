import { useQuery } from "@tanstack/react-query";

import { getUserTweets } from "@/utilities/fetch";

export default function TweetArrayLength({ username }: { username: string }) {
    const userTweetsQuery = useQuery({
        queryKey: ["tweets", username],
        queryFn: () => getUserTweets(username),
    });

    const tweetArrayLength = userTweetsQuery.data?.tweets?.length;

    return <span className="text-muted">{userTweetsQuery.isFetched ? tweetArrayLength : "0"} Tweets</span>;
}

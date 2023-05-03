import { useQuery } from "@tanstack/react-query";

import { TweetOptionsProps, TweetProps } from "@/types/TweetProps";
import { getReplies } from "@/utilities/fetch";
import CircularLoading from "../misc/CircularLoading";
import Tweet from "./Tweet";

export default function Replies({ tweetId, tweetAuthor }: TweetOptionsProps) {
    const queryKey = ["tweets", tweetAuthor, tweetId, "replies"];

    const { isLoading, data } = useQuery({
        queryKey: queryKey,
        queryFn: () => getReplies(tweetAuthor, tweetId),
    });

    if (isLoading) return <CircularLoading />;

    return (
        <div>
            {data.tweets &&
                data.tweets.map((tweet: TweetProps) => {
                    return <Tweet key={tweet.id} tweet={tweet} />;
                })}
        </div>
    );
}

import { useQuery } from "@tanstack/react-query";

import { TweetOptionsProps, TweetProps } from "@/types/TweetProps";
import { getReplies } from "@/utilities/fetch";
import CircularLoading from "../misc/CircularLoading";
import Tweet from "./Tweet";

export default function Replies({ tweetId, tweetAuthor }: TweetOptionsProps) {
    const { isLoading, data } = useQuery({
        queryKey: ["replies", tweetId],
        queryFn: () => getReplies(tweetAuthor, tweetId),
    });

    if (isLoading) return <CircularLoading />;

    return (
        <div>
            {data.replies &&
                data.replies.map((reply: TweetProps) => {
                    return <Tweet key={reply.id} tweet={reply} />;
                })}
        </div>
    );
}

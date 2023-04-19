"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserTweet } from "@/utilities/fetch";
import CircularLoading from "@/components/layout/CircularLoading";
import SingleTweet from "@/components/tweet/SingleTweet";

export default function SingleTweetPage({
    params: { username, tweetId },
}: {
    params: { username: string; tweetId: string };
}) {
    const queryKey = ["tweets", username, tweetId];

    const { isLoading, data } = useQuery({
        queryKey: queryKey,
        queryFn: () => getUserTweet(tweetId, username),
    });

    return <>{isLoading ? <CircularLoading /> : <SingleTweet tweet={data.tweet} />}</>;
}

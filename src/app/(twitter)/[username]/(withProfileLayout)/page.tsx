"use client";

import { useQuery } from "@tanstack/react-query";

import Tweets from "@/components/tweet/Tweets";
import { getUserTweets } from "@/utilities/fetch";
import CircularLoading from "@/components/misc/CircularLoading";

export default function UserTweets({ params: { username } }: { params: { username: string } }) {
    const { isLoading, error, data } = useQuery({
        queryKey: ["tweets", username],
        queryFn: () => getUserTweets(username),
    });

    if (error) return null; //global error

    return <>{isLoading ? <CircularLoading /> : <Tweets tweets={data.tweets} />}</>;
}

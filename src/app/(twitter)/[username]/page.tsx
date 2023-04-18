"use client";

import { useQuery } from "@tanstack/react-query";

import Tweets from "@/components/tweet/Tweets";
import CircularLoading from "@/components/layout/CircularLoading";
import { getUserTweets } from "@/utilities/fetch";

export default function UserTweets({ params }: any) {
    const { isLoading, error, data } = useQuery({
        queryKey: ["tweets", params.username],
        queryFn: () => getUserTweets(params.username),
    });

    if (error) return null; //global error

    return <>{isLoading ? <CircularLoading /> : <Tweets tweets={data.tweets} />}</>;
}

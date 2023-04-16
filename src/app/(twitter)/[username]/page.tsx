"use client";

import { useQuery } from "@tanstack/react-query";

import Tweets from "@/components/tweet/Tweets";
import Loading from "@/components/layout/Loading";
import { getUserTweets } from "@/utilities/fetch";

export default function UserTweets({ params }: any) {
    const { isLoading, error, data } = useQuery({
        queryKey: ["tweets", params.username],
        queryFn: () => getUserTweets(params.username),
    });

    if (error) return null; //global error

    return <>{isLoading ? <Loading /> : <Tweets tweets={data.tweets} />}</>;
}

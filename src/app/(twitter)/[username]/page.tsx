"use client";

import { useQuery } from "@tanstack/react-query";

import Tweets from "@/components/tweet/Tweets";
import Loading from "@/components/layout/Loading";
import { getUserTweets } from "@/utilities/fetch";

export default function UserTweets({ params }: any) {
    const userTweetsQuery = useQuery({
        queryKey: ["tweets", params.username],
        queryFn: () => getUserTweets(params.username),
    });

    return <>{userTweetsQuery.isLoading ? <Loading /> : <Tweets tweets={userTweetsQuery.data.tweets} />}</>;
}

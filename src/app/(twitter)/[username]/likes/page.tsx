"use client";

import { useQuery } from "@tanstack/react-query";

import Tweets from "@/components/tweet/Tweets";
import { getUserLikes } from "@/utilities/fetch";
import CircularLoading from "@/components/layout/CircularLoading";

export default function Likes({ params }: any) {
    const { isLoading, error, data } = useQuery({
        queryKey: ["tweets", params.username, "likes"],
        queryFn: () => getUserLikes(params.username),
    });

    if (error) return null; //global error

    return <>{isLoading ? <CircularLoading /> : <Tweets tweets={data.tweets} />}</>;
}

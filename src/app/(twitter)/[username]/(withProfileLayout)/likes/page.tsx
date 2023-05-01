"use client";

import { useQuery } from "@tanstack/react-query";

import Tweets from "@/components/tweet/Tweets";
import { getUserLikes } from "@/utilities/fetch";
import CircularLoading from "@/components/misc/CircularLoading";
import NotFound from "@/app/not-found";

export default function LikesPage({ params: { username } }: { params: { username: string } }) {
    const { isLoading, data } = useQuery({
        queryKey: ["tweets", username, "likes"],
        queryFn: () => getUserLikes(username),
    });

    if (!isLoading && !data.tweets) return NotFound();

    return <>{isLoading ? <CircularLoading /> : <Tweets tweets={data.tweets} />}</>;
}

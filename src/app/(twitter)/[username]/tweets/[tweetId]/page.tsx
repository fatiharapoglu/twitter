"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";

import { getUserTweet } from "@/utilities/fetch";
import SingleTweet from "@/components/tweet/SingleTweet";
import CircularLoading from "@/components/misc/CircularLoading";

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

    return (
        <div>
            <div className="back-to">
                <Link className="icon-hoverable" href={`/${username}`}>
                    <FaArrowLeft />
                </Link>
                <div className="top">
                    <span className="top-title">{username}</span>
                </div>
            </div>
            {isLoading ? <CircularLoading /> : <SingleTweet tweet={data.tweet} />}
        </div>
    );
}

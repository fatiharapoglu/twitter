"use client";

import { useContext } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";

import { getUserTweet } from "@/utilities/fetch";
import SingleTweet from "@/components/tweet/SingleTweet";
import CircularLoading from "@/components/misc/CircularLoading";
import { AuthContext } from "@/app/(twitter)/layout";
import NotFound from "@/app/not-found";

export default function SingleTweetPage({
    params: { username, tweetId },
}: {
    params: { username: string; tweetId: string };
}) {
    const queryKey = ["tweets", username, tweetId];

    const { token, isPending } = useContext(AuthContext);
    const { isLoading, data } = useQuery({
        queryKey: queryKey,
        queryFn: () => getUserTweet(tweetId, username),
    });

    if (!isLoading && !data.tweet) return NotFound();

    return (
        <div>
            <div className="back-to">
                <Link className="icon-hoverable" href="/home">
                    <FaArrowLeft />
                </Link>
                <div className="top">
                    <span className="top-title">{username}</span>
                </div>
            </div>
            {isLoading || isPending ? <CircularLoading /> : <SingleTweet tweet={data.tweet} token={token} />}
        </div>
    );
}

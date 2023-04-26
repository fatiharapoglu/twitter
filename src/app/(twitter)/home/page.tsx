"use client";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { getAllTweets } from "@/utilities/fetch";
import NewTweet from "@/components/tweet/NewTweet";
import Tweets from "@/components/tweet/Tweets";
import CircularLoading from "@/components/layout/CircularLoading";
import { AuthContext } from "../layout";

export default function HomePage() {
    const { token, isPending } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({ queryKey: ["tweets"], queryFn: getAllTweets });

    if (isPending) return <CircularLoading />;
    if (error) return null; //global error

    return (
        <main>
            <h1 className="page-name">Home</h1>
            {token && <NewTweet token={token} />}
            {isLoading ? <CircularLoading /> : <Tweets tweets={data.tweets} />}
        </main>
    );
}

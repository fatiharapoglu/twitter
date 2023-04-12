"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllTweets } from "@/utilities/fetch";
import NewTweet from "@/components/home/NewTweet";
import Tweets from "@/components/home/Tweets";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/layout/Loading";

export default function HomePage() {
    const auth = useAuth();
    const tweetsQuery = useQuery({ queryKey: ["tweets"], queryFn: getAllTweets });

    return (
        <main className="center">
            <h1>Home</h1>
            {auth.token && <NewTweet token={auth.token} />}
            {tweetsQuery.isLoading ? <Loading /> : <Tweets tweets={tweetsQuery.data.tweets} />}
        </main>
    );
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllTweets } from "@/utilities/fetch";
import NewTweet from "@/components/tweet/NewTweet";
import Tweets from "@/components/tweet/Tweets";
import Loading from "@/components/layout/Loading";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
    const auth = useAuth();
    const { isLoading, error, data } = useQuery({ queryKey: ["tweets"], queryFn: getAllTweets });

    if (auth.isPending) return Loading();
    if (error) return null; //global error

    return (
        <main>
            <h1 className="page-name">Home</h1>
            {auth.token && <NewTweet token={auth.token} />}
            {isLoading ? <Loading /> : <Tweets tweets={data.tweets} />}
        </main>
    );
}

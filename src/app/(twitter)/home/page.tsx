"use client";

import { useEffect, useState } from "react";

import NewTweet from "@/components/home/NewTweet";
import Tweets from "@/components/home/Tweets";
import { getAllTweets } from "@/utilities/fetch";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
    const [tweets, setTweets] = useState(null);
    const auth = useAuth();

    useEffect(() => {
        const fetch = async () => {
            const { tweets } = await getAllTweets();
            setTweets(tweets);
        };
        fetch();
    }, []);

    return (
        <main className="center">
            <h1>Home</h1>
            {auth && <NewTweet />}
            {tweets && <Tweets tweets={tweets} />}
        </main>
    );
}

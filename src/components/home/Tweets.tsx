"use client";

import { TweetProps, TweetsArray } from "@/types/TweetProps";

export default function Tweets({ tweets }: TweetsArray) {
    return (
        <div>
            {tweets.map((tweet: TweetProps) => {
                return (
                    <div key={tweet.id}>
                        <hr />
                        {tweet.author.name} <br /> {tweet.text}
                    </div>
                );
            })}
        </div>
    );
}

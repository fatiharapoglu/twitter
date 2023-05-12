import { TweetProps, TweetsArray } from "@/types/TweetProps";
import Tweet from "./Tweet";

export default function Tweets({ tweets }: TweetsArray) {
    return (
        <>
            {tweets &&
                tweets.map((tweet: TweetProps) => {
                    return <Tweet key={tweet.id} tweet={tweet} />;
                })}
        </>
    );
}

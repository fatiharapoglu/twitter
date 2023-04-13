import { TweetsArray } from "@/types/TweetProps";
import Tweet from "./Tweet";

export default function Tweets({ tweets }: TweetsArray) {
    return (
        <div className="tweets-wrapper">
            {tweets.map((tweet) => {
                return <Tweet key={tweet.id} tweet={tweet} />;
            })}
        </div>
    );
}

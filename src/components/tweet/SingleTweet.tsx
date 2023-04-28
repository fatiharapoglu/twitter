import { Avatar } from "@mui/material";
import Link from "next/link";

import { TweetProps } from "@/types/TweetProps";
import { formatDateExtended } from "@/utilities/date";
import Reply from "./Reply";
import Retweet from "./Retweet";
import Like from "./Like";
import Share from "./Share";
import Counters from "./Counters";

export default function SingleTweet({ tweet }: { tweet: TweetProps }) {
    return (
        <div className="single-tweet tweet">
            <div className="single-tweet-author-section">
                <div>
                    <Link className="tweet-avatar" href={`/${tweet.author.username}`}>
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt=""
                            src={tweet.author.photoUrl ? tweet.author.photoUrl : "/assets/egg.jpg"}
                        />
                    </Link>
                </div>
                <div className="tweet-author-section">
                    <Link className="tweet-author-link" href={`/${tweet.author.username}`}>
                        <span className="tweet-author">
                            {tweet.author.name !== "" ? tweet.author.name : tweet.author.username}
                        </span>
                        <span className="text-muted">@{tweet.author.username}</span>
                    </Link>
                </div>
            </div>
            <div className="tweet-main">
                <div className="tweet-text">{tweet.text}</div>
                <span className="text-muted date">{formatDateExtended(tweet.createdAt)}</span>
                <Counters tweet={tweet} />
                <div className="tweet-bottom">
                    <Reply />
                    <Retweet />
                    <Like tweetId={tweet.id} tweetAuthor={tweet.author.username} />
                    <Share />
                </div>
            </div>
        </div>
    );
}

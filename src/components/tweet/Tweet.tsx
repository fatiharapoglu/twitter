import { Avatar, Tooltip } from "@mui/material";
import Link from "next/link";

import { TweetProps } from "@/types/TweetProps";
import { formatDate, formatDateExtended } from "@/utilities/date";
import Reply from "./Reply";
import Retweet from "./Retweet";
import Like from "./Like";
import Share from "./Share";

export default function Tweet({ tweet }: { tweet: TweetProps }) {
    return (
        <div className="tweet">
            <Link className="tweet-avatar" href={`/${tweet.author.username}`}>
                <Avatar sx={{ width: 50, height: 50 }} alt="" src="https://picsum.photos/200/300" />
            </Link>
            <div className="tweet-main">
                <section className="tweet-author-section">
                    <Link className="tweet-author-link" href={`/${tweet.author.username}`}>
                        <span className="tweet-author">
                            {tweet.author.name !== "" ? tweet.author.name : tweet.author.username}
                        </span>
                        <span className="text-muted">@{tweet.author.username}</span>
                    </Link>
                    <Tooltip title={formatDateExtended(tweet.createdAt)} placement="top">
                        <span className="text-muted date">
                            <span className="middle-dot">·</span>
                            {formatDate(tweet.createdAt)}
                        </span>
                    </Tooltip>
                </section>
                <Link href={`/${tweet.author.username}/tweets/${tweet.id}`} className="tweet-text">
                    <p>{tweet.text}</p>
                </Link>
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

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDotsHorizontal } from "react-icons/rx";
import { Avatar, Menu, MenuItem } from "@mui/material";

import { TweetProps } from "@/types/TweetProps";
import { formatDateExtended } from "@/utilities/date";
import Reply from "./Reply";
import Retweet from "./Retweet";
import Like from "./Like";
import Share from "./Share";
import Counters from "./Counters";
import { getFullURL } from "@/utilities/misc/getFullURL";
import { VerifiedToken } from "@/types/TokenProps";
import { deleteTweet } from "@/utilities/fetch";
import PreviewDialog from "../dialog/PreviewDialog";
import { shimmer } from "@/utilities/misc/shimmer";

export default function SingleTweet({ tweet, token }: { tweet: TweetProps; token: VerifiedToken }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleAnchorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleAnchorClose = () => {
        setAnchorEl(null);
    };
    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handlePreviewClick();
    };
    const handlePreviewClick = () => {
        setIsPreviewOpen(true);
    };
    const handlePreviewClose = () => {
        setIsPreviewOpen(false);
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this tweet?") === false) return handleAnchorClose();
        if (!token) return alert("You must be logged in to delete tweets...");
        handleAnchorClose();
        const jsonId = JSON.stringify(token.id);
        await deleteTweet(tweet.id, tweet.authorId, jsonId);
        window.location.replace(`/${token.username}`);
    };

    return (
        <div className="single-tweet tweet">
            <div className="single-tweet-author-section">
                <div>
                    <Link className="tweet-avatar" href={`/${tweet.author.username}`}>
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt=""
                            src={tweet.author.photoUrl ? getFullURL(tweet.author.photoUrl) : "/assets/egg.jpg"}
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
                    {token && token.username === tweet.author.username && (
                        <>
                            <button className="three-dots icon-hoverable" onClick={handleAnchorClick}>
                                <RxDotsHorizontal />
                            </button>
                            <Menu anchorEl={anchorEl} onClose={handleAnchorClose} open={Boolean(anchorEl)}>
                                <MenuItem onClick={handleDelete} className="delete">
                                    Delete
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
            <div className="tweet-main">
                <div className="tweet-text">{tweet.text}</div>
                {tweet.photoUrl && (
                    <>
                        <div className="tweet-image">
                            <Image
                                onClick={handleImageClick}
                                src={getFullURL(tweet.photoUrl)}
                                alt="tweet image"
                                placeholder="blur"
                                blurDataURL={shimmer(500, 500)}
                                height={500}
                                width={500}
                            />
                        </div>
                        <PreviewDialog open={isPreviewOpen} handlePreviewClose={handlePreviewClose} url={tweet.photoUrl} />
                    </>
                )}
                <span className="text-muted date">{formatDateExtended(tweet.createdAt)}</span>
                <Counters tweet={tweet} />
                <div className="tweet-bottom">
                    <Reply />
                    <Retweet tweetId={tweet.id} tweetAuthor={tweet.author.username} />
                    <Like tweetId={tweet.id} tweetAuthor={tweet.author.username} />
                    <Share />
                </div>
            </div>
        </div>
    );
}

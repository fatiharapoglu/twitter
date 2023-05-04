import { Avatar, Popover, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { TweetProps } from "@/types/TweetProps";
import { formatDate, formatDateExtended } from "@/utilities/date";
import { shimmer } from "@/utilities/misc/shimmer";
import Reply from "./Reply";
import Retweet from "./Retweet";
import Like from "./Like";
import Share from "./Share";
import PreviewDialog from "../dialog/PreviewDialog";
import { getFullURL } from "@/utilities/misc/getFullURL";
import { AuthContext } from "@/app/(twitter)/layout";
import RetweetIcon from "../misc/RetweetIcon";
import ProfileCard from "../user/ProfileCard";

export default function Tweet({ tweet }: { tweet: TweetProps }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [hoveredProfile, setHoveredProfile] = useState("");

    const { token } = useContext(AuthContext);
    const router = useRouter();

    let displayedTweet = tweet;

    if (tweet.isRetweet) {
        displayedTweet = tweet.retweetOf;
    }

    const handleTweetClick = () => {
        router.push(`/${displayedTweet.author.username}/tweets/${displayedTweet.id}`);
    };
    const handlePropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
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
    const handlePopoverOpen = (e: React.MouseEvent<HTMLElement>, type: "default" | "mention" | "retweet" = "default") => {
        if (type === "mention") {
            setHoveredProfile(displayedTweet.repliedTo.author.username);
        }
        if (type === "retweet") {
            setHoveredProfile(tweet.author.username);
        }
        if (type === "default") {
            setHoveredProfile(displayedTweet.author.username);
        }
        setAnchorEl(e.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <motion.div
            onClick={handleTweetClick}
            className={`tweet div-link ${tweet.isRetweet && "retweet"} ${displayedTweet.isReply && "reply"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Link
                onClick={handlePropagation}
                className="tweet-avatar"
                href={`/${displayedTweet.author.username}`}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <Avatar
                    className="avatar"
                    sx={{ width: 50, height: 50 }}
                    alt=""
                    src={displayedTweet.author.photoUrl ? getFullURL(displayedTweet.author.photoUrl) : "/assets/egg.jpg"}
                />
            </Link>
            <div className="tweet-main">
                <section className="tweet-author-section">
                    <Link
                        onClick={handlePropagation}
                        className="tweet-author-link"
                        href={`/${displayedTweet.author.username}`}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        <span className="tweet-author">
                            {displayedTweet.author.name !== "" ? displayedTweet.author.name : displayedTweet.author.username}
                        </span>
                        <span className="text-muted">@{displayedTweet.author.username}</span>
                    </Link>
                    <Tooltip title={formatDateExtended(displayedTweet.createdAt)} placement="top">
                        <span className="text-muted date">
                            <span className="middle-dot">·</span>
                            {formatDate(displayedTweet.createdAt)}
                        </span>
                    </Tooltip>
                </section>
                <div className="tweet-text">
                    {displayedTweet.isReply && (
                        <Link
                            onClick={handlePropagation}
                            href={`/${displayedTweet.repliedTo.author.username}`}
                            className="reply-to"
                        >
                            <span
                                className="mention"
                                onMouseEnter={(e) => handlePopoverOpen(e, "mention")}
                                onMouseLeave={handlePopoverClose}
                            >
                                @{displayedTweet.repliedTo.author.username}
                            </span>
                        </Link>
                    )}{" "}
                    {displayedTweet.text}
                </div>
                {displayedTweet.photoUrl && (
                    <div onClick={handlePropagation}>
                        <div className="tweet-image">
                            <Image
                                onClick={handleImageClick}
                                src={getFullURL(displayedTweet.photoUrl)}
                                alt="tweet image"
                                placeholder="blur"
                                blurDataURL={shimmer(500, 500)}
                                height={500}
                                width={500}
                            />
                        </div>
                        <PreviewDialog
                            open={isPreviewOpen}
                            handlePreviewClose={handlePreviewClose}
                            url={displayedTweet.photoUrl}
                        />
                    </div>
                )}
                <div onClick={handlePropagation} className="tweet-bottom">
                    <Reply tweet={displayedTweet} />
                    <Retweet tweetId={displayedTweet.id} tweetAuthor={displayedTweet.author.username} />
                    <Like tweetId={displayedTweet.id} tweetAuthor={displayedTweet.author.username} />
                    <Share />
                </div>
            </div>
            {tweet.isRetweet &&
                (token?.username === tweet.author.username ? (
                    <Link onClick={handlePropagation} href={`/${token?.username}`} className="retweeted-by">
                        <RetweetIcon /> You retweeted.
                    </Link>
                ) : (
                    <Link
                        onClick={handlePropagation}
                        href={`/${tweet.author.username}`}
                        className="retweeted-by"
                        onMouseEnter={(e) => handlePopoverOpen(e, "retweet")}
                        onMouseLeave={handlePopoverClose}
                    >
                        <RetweetIcon /> {`${tweet.author.name ? tweet.author.name : tweet.author.username} retweeted.`}
                    </Link>
                ))}
            <Popover
                sx={{
                    pointerEvents: "none",
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <ProfileCard username={hoveredProfile} token={token} />
            </Popover>
        </motion.div>
    );
}

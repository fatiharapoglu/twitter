import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { RxDotsHorizontal } from "react-icons/rx";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { AiFillTwitterCircle } from "react-icons/ai";

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
import NewReply from "./NewReply";
import Replies from "./Replies";
import CustomSnackbar from "../misc/CustomSnackbar";
import { SnackbarProps } from "@/types/SnackbarProps";
import CircularLoading from "../misc/CircularLoading";
import { sleepFunction } from "@/utilities/misc/sleep";

export default function SingleTweet({ tweet, token }: { tweet: TweetProps; token: VerifiedToken }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarProps>({ message: "", severity: "success", open: false });

    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (jsonId: string) => deleteTweet(tweet.id, tweet.authorId, jsonId),
        onSuccess: async () => {
            setIsConfirmationOpen(false);
            setIsDeleting(false);
            setSnackbar({
                message: "Tweet deleted successfully.",
                severity: "success",
                open: true,
            });
            await sleepFunction(); // for waiting snackbar to acknowledge delete for better user experience
            queryClient.invalidateQueries(["tweets", tweet.author.username]);
            router.replace(`/${tweet.author.username}`);
        },
    });

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
    const handleConfirmationClick = () => {
        handleAnchorClose();
        setIsConfirmationOpen(true);
    };

    const handleDelete = async () => {
        if (!token) {
            return setSnackbar({
                message: "You must be logged in to delete tweets...",
                severity: "info",
                open: true,
            });
        }
        handleAnchorClose();
        setIsDeleting(true);
        const jsonId = JSON.stringify(token.id);
        mutation.mutate(jsonId);
    };

    return (
        <div>
            <div className={`single-tweet tweet ${tweet.isReply && "reply"}`}>
                <div className="single-tweet-author-section">
                    <div>
                        <Link className="tweet-avatar" href={`/${tweet.author.username}`}>
                            <Avatar
                                className="avatar"
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
                                {tweet.author.isPremium && (
                                    <span className="blue-tick" data-blue="Verified Blue">
                                        <AiFillTwitterCircle />
                                    </span>
                                )}
                            </span>
                            <span className="text-muted">@{tweet.author.username}</span>
                        </Link>
                        {token && token.username === tweet.author.username && (
                            <>
                                <button className="three-dots icon-hoverable" onClick={handleAnchorClick}>
                                    <RxDotsHorizontal />
                                </button>
                                <Menu anchorEl={anchorEl} onClose={handleAnchorClose} open={Boolean(anchorEl)}>
                                    <MenuItem onClick={handleConfirmationClick} className="delete">
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
                </div>
                <div className="tweet-main">
                    <div className="tweet-text">
                        {tweet.isReply && (
                            <Link href={`/${tweet.repliedTo.author.username}`} className="reply-to">
                                <span className="mention">@{tweet.repliedTo.author.username}</span>
                            </Link>
                        )}{" "}
                        {tweet.text}
                    </div>
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
                            <PreviewDialog
                                open={isPreviewOpen}
                                handlePreviewClose={handlePreviewClose}
                                url={tweet.photoUrl}
                            />
                        </>
                    )}
                    <span className="text-muted date">{formatDateExtended(tweet.createdAt)}</span>
                    <Counters tweet={tweet} />
                    <div className="tweet-bottom">
                        <Reply tweet={tweet} />
                        <Retweet tweetId={tweet.id} tweetAuthor={tweet.author.username} />
                        <Like tweetId={tweet.id} tweetAuthor={tweet.author.username} />
                        <Share
                            tweetUrl={`https://${window.location.hostname}/${tweet.author.username}/tweets/${tweet.id}`}
                        />
                    </div>
                </div>
            </div>
            {token && <NewReply token={token} tweet={tweet} />}
            {tweet.replies.length > 0 && <Replies tweetId={tweet.id} tweetAuthor={tweet.author.username} />}
            {snackbar.open && (
                <CustomSnackbar message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar} />
            )}
            {isConfirmationOpen && (
                <div className="html-modal-wrapper">
                    <dialog open className="confirm">
                        <h1>Delete Tweet?</h1>
                        <p>
                            This can’t be undone and it will be removed from your profile, the timeline of any accounts that
                            follow you, and from Twitter search results.
                        </p>
                        {isDeleting ? (
                            <CircularLoading />
                        ) : (
                            <>
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    Delete
                                </button>
                                <button className="btn btn-white" onClick={() => setIsConfirmationOpen(false)}>
                                    Cancel
                                </button>
                            </>
                        )}
                    </dialog>
                </div>
            )}
        </div>
    );
}

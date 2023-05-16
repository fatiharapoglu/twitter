"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegComment, FaRegEnvelope } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { RiChatFollowUpLine } from "react-icons/ri";
import { Avatar, Popover } from "@mui/material";

import { NotificationProps } from "@/types/NotificationProps";
import { getFullURL } from "@/utilities/misc/getFullURL";
import RetweetIcon from "./RetweetIcon";
import ProfileCard from "../user/ProfileCard";
import { UserProps } from "@/types/UserProps";

export default function Notification({ notification, token }: { notification: NotificationProps; token: UserProps }) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const content = JSON.parse(notification.content);

    const tweetUrl = `/${notification.user.username}/tweets/${content?.content?.id}`;
    const profileUrl = `/${content?.sender.username}`;

    const popoverJSX = (
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
            <ProfileCard username={content?.sender.username} token={token} />
        </Popover>
    );

    const sharedJSX = (
        <div className="notification-sender">
            <Link
                href={profileUrl}
                className="avatar-wrapper"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <Avatar
                    sx={{ width: 33, height: 33 }}
                    alt=""
                    src={content?.sender.photoUrl ? getFullURL(content?.sender.photoUrl) : "/assets/egg.jpg"}
                />
                <div className="profile-info-main">
                    <h1>
                        {content?.sender.name !== "" ? content?.sender.name : content?.sender.username}{" "}
                        <span className="text-muted">(@{content?.sender.username})</span>
                    </h1>
                </div>
            </Link>
            {popoverJSX}
        </div>
    );

    if (notification.type === "message") {
        return (
            <div className="notification">
                <div className="icon-div message">
                    <FaRegEnvelope />
                </div>
                <div>
                    {sharedJSX} <span className={!notification.isRead ? "bold" : ""}>Sent you a direct message.</span>{" "}
                    <Link className={`notification-link ${!notification.isRead ? "bold" : ""}`} href="/messages">
                        Check it out!
                    </Link>
                </div>
            </div>
        );
    } else if (notification.type === "follow") {
        return (
            <div className="notification">
                <div className="icon-div follow">
                    <RiChatFollowUpLine />
                </div>
                <div>
                    {sharedJSX}{" "}
                    <span className={!notification.isRead ? "bold" : ""}>
                        Started following you. Stay connected and discover their updates!
                    </span>
                </div>
            </div>
        );
    } else if (notification.type === "like") {
        return (
            <div className="notification">
                <div className="icon-div like">
                    <FaHeart />
                </div>
                <div>
                    {sharedJSX} <span className={!notification.isRead ? "bold" : ""}>Liked your</span>{" "}
                    <Link className={`notification-link ${!notification.isRead ? "bold" : ""}`} href={tweetUrl}>
                        tweet.
                    </Link>
                </div>
            </div>
        );
    } else if (notification.type === "reply") {
        return (
            <div className="notification ">
                <div className="icon-div reply">
                    <FaRegComment />
                </div>
                <div>
                    {sharedJSX} <span className={!notification.isRead ? "bold" : ""}>Replied to your</span>{" "}
                    <Link className={`notification-link ${!notification.isRead ? "bold" : ""}`} href={tweetUrl}>
                        tweet.
                    </Link>
                </div>
            </div>
        );
    } else if (notification.type === "retweet") {
        return (
            <div className="notification">
                <div className="icon-div retweet">
                    <RetweetIcon />
                </div>
                <div>
                    {sharedJSX} <span className={!notification.isRead ? "bold" : ""}>Retweeted your</span>{" "}
                    <Link className={`notification-link ${!notification.isRead ? "bold" : ""}`} href={tweetUrl}>
                        tweet.
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="notification">
                <div className="icon-div welcome">
                    <GiPartyPopper />
                </div>
                <div className={!notification.isRead ? "bold" : ""}>
                    Welcome to the Twitter! <br />
                    Start exploring and sharing your thoughts with the world.
                </div>
            </div>
        );
    }
}

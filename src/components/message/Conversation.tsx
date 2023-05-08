import { useState } from "react";
import Link from "next/link";
import { Avatar, Popover, Tooltip } from "@mui/material";
import { AiFillTwitterCircle } from "react-icons/ai";

import { getFullURL } from "@/utilities/misc/getFullURL";
import { formatDate, formatDateExtended } from "@/utilities/date";
import ProfileCard from "../user/ProfileCard";
import { BsThreeDots } from "react-icons/bs";
import { ConversationProps } from "@/types/MessageProps";

export default function Conversation({ conversation, token, handleConversations }: ConversationProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const recipient = conversation.participants.find((user) => user !== token.username);

    const { name, username, photoUrl, isPremium } =
        conversation.messages[conversation.messages.length - 1].recipient.username === recipient
            ? conversation.messages[conversation.messages.length - 1].recipient
            : conversation.messages[conversation.messages.length - 1].sender;

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    const handlePopoverOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handleConversationClick = () => {
        handleConversations(true, conversation.messages);
    };

    return (
        <div className="conversation" onClick={handleConversationClick}>
            <Link href={`/${username}`} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                <Avatar
                    className="avatar"
                    sx={{ width: 50, height: 50 }}
                    alt=""
                    src={photoUrl ? getFullURL(photoUrl) : "/assets/egg.jpg"}
                />
            </Link>
            <div className="user-wrapper">
                <section className="user-section">
                    <Link
                        className="user-name-link"
                        href={`/${username}`}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        <span className="user-name">
                            {name !== "" ? name : username}
                            {isPremium && (
                                <span className="blue-tick">
                                    <AiFillTwitterCircle />
                                </span>
                            )}
                        </span>
                        <span className="text-muted">@{username}</span>
                    </Link>
                    <Tooltip title={formatDateExtended(lastMessage.createdAt)} placement="top">
                        <span className="text-muted date">
                            <span className="middle-dot">·</span>
                            {formatDate(lastMessage.createdAt)}
                        </span>
                    </Tooltip>
                </section>
                <div className="last-message text-muted">{lastMessage.text}</div>
            </div>
            <button className="three-dots icon-hoverable">
                <BsThreeDots />
            </button>
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
                <ProfileCard username={username} token={token} />
            </Popover>
        </div>
    );
}

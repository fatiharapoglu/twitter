import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Menu, MenuItem, Popover, Tooltip } from "@mui/material";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RxDotsHorizontal } from "react-icons/rx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getFullURL } from "@/utilities/misc/getFullURL";
import { formatDate, formatDateExtended } from "@/utilities/date";
import ProfileCard from "../user/ProfileCard";
import { ConversationProps } from "@/types/MessageProps";
import CircularLoading from "../misc/CircularLoading";
import { deleteConversation } from "@/utilities/fetch";

export default function Conversation({ conversation, token, handleConversations }: ConversationProps) {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [anchorMenuEl, setAnchorMenuEl] = useState<HTMLElement | null>(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (tokenOwnerId: string) => deleteConversation(conversation.participants, tokenOwnerId),
        onSuccess: () => {
            setIsConfirmationOpen(false);
            setIsDeleting(false);
            queryClient.invalidateQueries(["messages", token.username]);
        },
    });

    const messagedUsername = conversation.participants.find((user) => user !== token.username);

    const { name, username, photoUrl, isPremium } =
        conversation.messages[conversation.messages.length - 1].recipient.username === messagedUsername
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
        handleConversations(true, conversation.messages, messagedUsername);
    };
    const handleConfirmationClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAnchorMenuEl(null);
        setIsConfirmationOpen(true);
    };
    const handleThreeDotsClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setAnchorMenuEl(e.currentTarget);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        handlePopoverClose();
        setIsDeleting(true);
        const jsonId = JSON.stringify(token.id);
        mutation.mutate(jsonId);
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
                                <span className="blue-tick" data-blue="Verified Blue">
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
            <>
                <button className="three-dots icon-hoverable" onClick={handleThreeDotsClick}>
                    <RxDotsHorizontal />
                </button>
                <Menu anchorEl={anchorMenuEl} onClose={() => setAnchorMenuEl(null)} open={Boolean(anchorMenuEl)}>
                    <MenuItem onClick={handleConfirmationClick} className="delete">
                        Delete
                    </MenuItem>
                </Menu>
            </>
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
            {isConfirmationOpen && (
                <div className="html-modal-wrapper">
                    <dialog open className="confirm">
                        <h1>Delete Conversation?</h1>
                        <p>
                            Are you sure you want to clear this conversation? If you proceed, your messages will be removed,
                            as well as the messages in the recipient&apos;s message box.
                        </p>
                        {isDeleting ? (
                            <CircularLoading />
                        ) : (
                            <>
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    Delete
                                </button>
                                <button
                                    className="btn btn-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsConfirmationOpen(false);
                                    }}
                                >
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

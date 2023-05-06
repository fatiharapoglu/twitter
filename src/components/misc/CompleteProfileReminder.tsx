import { useState } from "react";
import { Tooltip } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

import { UserProps } from "@/types/UserProps";
import Link from "next/link";

export default function CompleteProfileReminder({ token }: { token: UserProps }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen &&
                (!token.name ||
                    !token.description ||
                    !token.photoUrl ||
                    !token.location ||
                    !token.website ||
                    !token.headerUrl) && (
                    <div className="complete-reminder">
                        <h1>
                            Complete your profile
                            <AiOutlineClose className="btn-close icon-hoverable right-sidebar-close" onClick={handleClose} />
                        </h1>
                        <p>
                            Complete your Twitter profile to make the most of your presence! Here are a few things you have
                            not filled out yet:
                        </p>
                        <ol>
                            {!token.name && (
                                <Tooltip
                                    title="Don't forget to add your name to your profile! Let others know who you are and personalize your Twitter experience. Take a moment to fill in your name now and make meaningful connections."
                                    placement="top"
                                >
                                    <li>Add your name:</li>
                                </Tooltip>
                            )}
                            {!token.description && (
                                <Tooltip
                                    title="Share a brief description about yourself or what you tweet about."
                                    placement="top"
                                >
                                    <li>Write a bio:</li>
                                </Tooltip>
                            )}
                            {!token.photoUrl && (
                                <Tooltip title="Let others see the face behind your tweets." placement="top">
                                    <li>Add a profile picture:</li>
                                </Tooltip>
                            )}
                            {!token.headerUrl && (
                                <Tooltip title="Make your profile visually appealing and unique." placement="top">
                                    <li>Customize your header image:</li>
                                </Tooltip>
                            )}
                            {!token.location && (
                                <Tooltip
                                    title="Let others know where you're tweeting from and connect with users in your area. Take a moment to update your location and make your Twitter experience more engaging."
                                    placement="top"
                                >
                                    <li>Your location</li>
                                </Tooltip>
                            )}
                            {!token.website && (
                                <Tooltip
                                    title="Showcase your personal blog, portfolio, or any other online presence."
                                    placement="top"
                                >
                                    <li>Include your website:</li>
                                </Tooltip>
                            )}
                        </ol>
                        <Link href={`/${token.username}/edit`} className="btn btn-white">
                            Edit Profile
                        </Link>
                    </div>
                )}
        </>
    );
}

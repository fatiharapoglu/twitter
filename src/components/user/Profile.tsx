"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa";
import { Avatar, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { BsBalloon, BsCalendar3 } from "react-icons/bs";

import { formatDateForProfile } from "@/utilities/date";
import { AuthContext } from "@/app/(twitter)/layout";
import { UserProps } from "@/types/UserProps";
import TweetArrayLength from "../tweet/TweetArrayLength";
import Follow from "./Follow";
import User from "./User";
import { getFullURL } from "@/utilities/misc/getFullURL";
import PreviewDialog from "../dialog/PreviewDialog";

export default function Profile({ profile }: { profile: UserProps }) {
    const [dialogType, setDialogType] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [preview, setPreview] = useState({ open: false, url: "" });

    const { token } = useContext(AuthContext);
    const pathname = usePathname();

    const handleDialogOpen = (type: string) => {
        if (!token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
        }

        if (type === "following" && profile.following.length === 0) return;
        if (type === "followers" && profile.followers.length === 0) return;

        setDialogType(type);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogType("");
        setIsDialogOpen(false);
    };

    const handleImageClick = (e: any) => {
        const clickedElement = e.target;
        if (clickedElement.alt === "profile-header") {
            handlePreviewClick(profile.headerUrl ? profile.headerUrl : "/assets/header.jpg");
        }
        if (clickedElement.alt === "profile-photo") {
            handlePreviewClick(profile.photoUrl ? profile.photoUrl : "/assets/egg.jpg");
        }
    };

    const handlePreviewClick = (url: string) => {
        setPreview({ open: true, url });
    };

    const handlePreviewClose = () => {
        setPreview({ open: false, url: "" });
    };

    const isFollowingTokenOwner = () => {
        if (profile.following.length === 0 || !token) return false;
        const isFollowing = profile.following.some((user) => user.id === token.id);
        return isFollowing;
    };

    return (
        <>
            <div className="back-to">
                <Link className="icon-hoverable" href="/home">
                    <FaArrowLeft />
                </Link>
                <div className="top">
                    <span className="top-title">{profile.username}</span>
                    <TweetArrayLength username={profile.username} />
                </div>
            </div>
            <div className="profile">
                <div className="profile-header">
                    <Image
                        onClick={handleImageClick}
                        className="div-link"
                        alt="profile-header"
                        src={profile.headerUrl ? getFullURL(profile.headerUrl) : "/assets/header.jpg"}
                        fill
                    />
                    <div className="avatar-wrapper">
                        <Avatar
                            className="div-link"
                            onClick={handleImageClick}
                            sx={{ width: 125, height: 125 }}
                            alt="profile-photo"
                            src={profile.photoUrl ? getFullURL(profile.photoUrl) : "/assets/egg.jpg"}
                        />
                    </div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-main">
                        <h1>{profile.name !== "" ? profile.name : profile.username}</h1>
                        <div className="text-muted">
                            @{profile.username}{" "}
                            {isFollowingTokenOwner() && <span className="is-following">Follows you</span>}
                        </div>
                    </div>
                    {profile.description && <div className="profile-info-desc">{profile.description}</div>}
                    <div className="profile-info-optional text-muted">
                        <div>
                            <BsBalloon /> Born date placeholder
                        </div>
                        <div>
                            <BsCalendar3 /> Joined {formatDateForProfile(profile.createdAt)}
                        </div>
                    </div>
                    <div className="profile-info-popularity">
                        <div onClick={() => handleDialogOpen("following")} className="popularity-section">
                            <span className="count">{profile.following.length}</span>{" "}
                            <span className="text-muted">Following</span>
                        </div>
                        <div onClick={() => handleDialogOpen("followers")} className="popularity-section">
                            <span className="count">{profile.followers.length}</span>{" "}
                            <span className="text-muted">Followers</span>
                        </div>
                    </div>
                    {token?.username === profile.username ? (
                        <Link href={`/${profile.username}/edit`} className="btn btn-white edit-profile-section">
                            Edit profile
                        </Link>
                    ) : (
                        <div className="edit-profile-section flex">
                            <button className="btn btn-white icon-hoverable">
                                <FaRegEnvelope />
                            </button>
                            <Follow profile={profile} />
                        </div>
                    )}
                </div>
            </div>
            <nav className="profile-nav">
                <Link
                    className={`profile-nav-link ${pathname === `/${profile.username}` ? "active" : ""}`}
                    href={`/${profile.username}`}
                >
                    <span>Tweets</span>
                </Link>
                <Link
                    className={`profile-nav-link ${pathname === `/${profile.username}/replies` ? "active" : ""}`}
                    href={`/${profile.username}/replies`}
                >
                    <span>Replies</span>
                </Link>
                <Link
                    className={`profile-nav-link ${pathname === `/${profile.username}/media` ? "active" : ""}`}
                    href={`/${profile.username}/media`}
                >
                    <span>Media</span>
                </Link>
                <Link
                    className={`profile-nav-link ${pathname === `/${profile.username}/likes` ? "active" : ""}`}
                    href={`/${profile.username}/likes`}
                >
                    <span>Likes</span>
                </Link>
            </nav>
            {isDialogOpen && (
                <Dialog className="dialog" open={isDialogOpen} onClose={handleDialogClose} fullWidth>
                    <DialogTitle className="title">
                        {dialogType === "following" ? "Following" : dialogType === "followers" ? "Followers" : ""}
                    </DialogTitle>
                    <DialogContent sx={{ paddingX: 0 }}>
                        <div className="user-list">
                            {dialogType === "following"
                                ? profile.following.map((user) => (
                                      <div className="user-wrapper" key={"following" + user.id}>
                                          <User user={user} />
                                      </div>
                                  ))
                                : profile.followers.map((user) => (
                                      <div className="user-wrapper" key={"followers" + user.id}>
                                          <User user={user} />
                                      </div>
                                  ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            <PreviewDialog open={preview.open} handlePreviewClose={handlePreviewClose} url={preview.url} />
        </>
    );
}

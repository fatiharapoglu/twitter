"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { BsBalloon, BsCalendar3 } from "react-icons/bs";

import { AuthorProps } from "@/types/AuthorProps";
import { formatDateForProfile } from "@/utilities/date";
import TweetArrayLength from "../tweet/TweetArrayLength";
import { AuthContext } from "@/app/(twitter)/layout";

export default function Profile({ profile }: { profile: AuthorProps }) {
    const { token } = useContext(AuthContext);

    const pathname = usePathname();

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
                    <Image alt="" src={profile.headerUrl ? profile.headerUrl : "/assets/header.jpg"} fill />
                    <div className="avatar-wrapper">
                        <Avatar
                            sx={{ width: 125, height: 125 }}
                            alt=""
                            src={profile.photoUrl ? profile.photoUrl : "/assets/egg.jpg"}
                        />
                    </div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-main">
                        <h1>{profile.name !== "" ? profile.name : profile.username}</h1>
                        <div className="text-muted">@{profile.username}</div>
                    </div>
                    <div className="profile-info-desc">Description placeholder</div>
                    <div className="profile-info-optional text-muted">
                        <div>
                            <BsBalloon /> Born date placeholder
                        </div>
                        <div>
                            <BsCalendar3 /> Joined {formatDateForProfile(profile.createdAt)}
                        </div>
                    </div>
                    <div className="profile-info-popularity">
                        <div>
                            <span className="count">46</span> <span className="text-muted">Following</span>
                        </div>
                        <div>
                            <span className="count">77</span> <span className="text-muted">Followers</span>
                        </div>
                    </div>
                    {token?.username === profile.username ? (
                        <button className="btn btn-white edit-profile-btn">Edit profile</button>
                    ) : null}
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
        </>
    );
}

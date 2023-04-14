"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { BsBalloon, BsCalendar3 } from "react-icons/bs";

import useAuth from "@/hooks/useAuth";
import { AuthorProps } from "@/types/AuthorProps";
import { formatDateForProfile } from "@/utilities/date";
import TweetArrayLength from "../tweet/TweetArrayLength";

export default function Profile({ params, profile }: { params: any; profile: AuthorProps }) {
    const auth = useAuth();
    const pathname = usePathname();
    const tempLength = 15;

    return (
        <main>
            <div className="back-to-home">
                <Link className="icon-hoverable" href="/home">
                    <FaArrowLeft />
                </Link>
                <div className="top">
                    <span className="top-username">{params.username}</span>
                    <TweetArrayLength username={params.username} />
                </div>
            </div>
            <section className="profile">
                <div className="profile-header">
                    <Image alt="" src="https://picsum.photos/600/200" fill />
                    <div className="avatar-wrapper">
                        <Avatar sx={{ width: 125, height: 125 }} alt="" src="https://picsum.photos/125/125" />
                    </div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-main">
                        <h1>{profile.name}</h1>
                        <div className="text-muted">@{profile.username}</div>
                    </div>
                    <p className="profile-info-desc">Description placeholder</p>
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
                    {auth.token?.username === params.username ? (
                        <button className="btn btn-white edit-profile-btn">Edit profile</button>
                    ) : null}
                </div>
            </section>
            <nav className="profile-nav">
                <Link
                    className={`profile-nav-link ${pathname === `/${params.username}` ? "active" : ""}`}
                    href={`/${params.username}`}
                >
                    <span>Tweets</span>
                </Link>
                <Link
                    className={`profile-nav-link ${pathname === `/${params.username}/replies` ? "active" : ""}`}
                    href={`/${params.username}/replies`}
                >
                    <span>Replies</span>
                </Link>
                <Link
                    className={`profile-nav-link ${pathname === `/${params.username}/media` ? "active" : ""}`}
                    href={`/${params.username}/media`}
                >
                    <span>Media</span>
                </Link>
                <Link
                    className={`profile-nav-link ${pathname === `/${params.username}/likes` ? "active" : ""}`}
                    href={`/${params.username}/likes`}
                >
                    <span>Likes</span>
                </Link>
            </nav>
        </main>
    );
}

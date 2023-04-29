"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { BsBalloon, BsCalendar3 } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { formatDateForProfile } from "@/utilities/date";
import { AuthContext } from "@/app/(twitter)/layout";
import { updateUserFollows } from "@/utilities/fetch";
import { UserResponse, UserProps } from "@/types/UserProps";
import TweetArrayLength from "../tweet/TweetArrayLength";

export default function Profile({ profile }: { profile: UserProps }) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { isPending, token } = useContext(AuthContext);
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const queryKey = ["users", profile.username];

    const followMutation = useMutation({
        mutationFn: (tokenOwnerId: string) => updateUserFollows(profile.username, tokenOwnerId, false),
        onMutate: async (tokenOwnerId: string) => {
            setIsButtonDisabled(true);
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previous = queryClient.getQueryData<UserResponse>(queryKey);
            setIsFollowed(true);
            if (previous) {
                queryClient.setQueryData(queryKey, {
                    ...previous,
                    user: {
                        ...previous.user,
                        followers: [...previous.user.followers, tokenOwnerId],
                    },
                });
            }
            return { previous };
        },
        onError: (err, variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    const unfollowMutation = useMutation({
        mutationFn: (tokenOwnerId: string) => updateUserFollows(profile.username, tokenOwnerId, true),
        onMutate: async (tokenOwnerId: string) => {
            setIsButtonDisabled(true);
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previous = queryClient.getQueryData<UserResponse>(queryKey);
            setIsFollowed(false);
            if (previous) {
                queryClient.setQueryData(queryKey, {
                    ...previous,
                    user: {
                        ...previous.user,
                        followers: previous.user.followers.filter((user) => JSON.stringify(user.id) !== tokenOwnerId),
                    },
                });
            }
            return { previous };
        },
        onError: (err, variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    const handleFollowclick = () => {
        if (!token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
        }

        const tokenOwnerId = JSON.stringify(token.id);
        const followers = profile.followers;
        const isFollowedByTokenOwner = followers.some((user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId);

        if (!followMutation.isLoading && !followMutation.isLoading) {
            if (isFollowedByTokenOwner) {
                unfollowMutation.mutate(tokenOwnerId);
            } else {
                followMutation.mutate(tokenOwnerId);
            }
        }
    };

    useEffect(() => {
        if (!isPending && token) {
            const tokenOwnerId = JSON.stringify(token.id);
            const followers = profile.followers;
            const isFollowedByTokenOwner = followers.some(
                (user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId
            );
            setIsFollowed(isFollowedByTokenOwner);
        }
    }, [isPending]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [isButtonDisabled]);

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
                        <button className="btn btn-white edit-profile-section">Edit profile</button>
                    ) : (
                        <div className="edit-profile-section flex">
                            <button className="btn btn-white icon-hoverable">
                                <FaRegEnvelope />
                            </button>
                            <button onClick={handleFollowclick} className="btn btn-dark" disabled={isButtonDisabled}>
                                {isFollowed ? "Following" : "Follow"}
                            </button>
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
        </>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar } from "@mui/material";

import useAuth from "@/hooks/useAuth";

export default function UsernamePage({ params }: any) {
    const auth = useAuth();
    const tempLength = 15;

    return (
        <main className="profile-wrapper">
            <div className="back-to-home">
                <Link className="icon-hoverable" href="/home">
                    <FaArrowLeft />
                </Link>
                <div className="top">
                    <span className="top-username">{params.username}</span>
                    <span className="text-muted">{tempLength} Tweets</span>
                </div>
            </div>
            <section className="profile">
                <div className="profile-header">
                    <Image alt="" src="https://picsum.photos/900/400" fill />
                    <div className="avatar-wrapper">
                        <Avatar
                            sx={{ width: 125, height: 125 }}
                            alt=""
                            src="https://picsum.photos/125/125"
                        />
                    </div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-main">
                        <h1>Fatih Arapoğlu</h1>
                        <div className="text-muted">@username</div>
                    </div>
                    <p className="profile-info-desc">
                        Official Twitter updates on PlayStation, PS5, PS4, PS VR, PlayStation Plus
                        and more. Support: @AskPlayStation
                    </p>
                    <div className="profile-info-optional text-muted">
                        <div>Born March 23</div>
                        <div>Joined November 2007</div>
                    </div>
                    <div className="profile-info-popularity">
                        <div>
                            <span className="count">46</span>{" "}
                            <span className="text-muted">Following</span>
                        </div>
                        <div>
                            <span className="count">77</span>{" "}
                            <span className="text-muted">Followers</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

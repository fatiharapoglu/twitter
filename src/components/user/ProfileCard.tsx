import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AiFillTwitterCircle } from "react-icons/ai";

import { getUser } from "@/utilities/fetch";
import { getFullURL } from "@/utilities/misc/getFullURL";
import CircularLoading from "../misc/CircularLoading";
import { UserProps } from "@/types/UserProps";
import { VerifiedToken } from "@/types/TokenProps";

export default function ProfileCard({ username, token }: { username: string; token: VerifiedToken }) {
    const { isLoading, data } = useQuery({
        queryKey: ["users", username],
        queryFn: () => getUser(username),
    });

    if (isLoading) return <CircularLoading />;

    const isFollowingTokenOwner = () => {
        if (data.user.following.length === 0 || !token) return false;
        const isFollowing = data.user.following.some((user: UserProps) => user.id === token.id);
        return isFollowing;
    };

    return (
        <div className="profile-card">
            <div className="avatar-wrapper">
                <Avatar
                    sx={{ width: 75, height: 75 }}
                    alt=""
                    src={data.user.photoUrl ? getFullURL(data.user.photoUrl) : "/assets/egg.jpg"}
                />
            </div>
            <div className="profile-info-main">
                <h1>
                    {data.user.name !== "" ? data.user.name : data.user.username}
                    {data.user.isPremium && (
                        <span className="blue-tick">
                            <AiFillTwitterCircle />
                        </span>
                    )}
                </h1>
                <div className="text-muted">
                    @{data.user.username} {isFollowingTokenOwner() && <span className="is-following">Follows you</span>}
                </div>
            </div>
            {data.user.description && <div className="profile-info-desc">{data.user.description}</div>}
            <div className="profile-info-popularity">
                <div className="popularity-section">
                    <span className="count">{data.user.following.length}</span> <span className="text-muted">Following</span>
                </div>
                <div className="popularity-section">
                    <span className="count">{data.user.followers.length}</span> <span className="text-muted">Followers</span>
                </div>
            </div>
        </div>
    );
}

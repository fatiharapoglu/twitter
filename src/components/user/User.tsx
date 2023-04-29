import { useContext } from "react";
import { Avatar } from "@mui/material";
import Link from "next/link";

import { UserProps } from "@/types/UserProps";
import { AuthContext } from "@/app/(twitter)/layout";
import Follow from "./Follow";

export default function User({ user }: { user: UserProps }) {
    const { token } = useContext(AuthContext);

    return (
        <>
            <Link href={`/${user.username}`}>
                <Avatar sx={{ width: 50, height: 50 }} alt="" src={user.photoUrl ? user.photoUrl : "/assets/egg.jpg"} />
            </Link>
            <div className="user">
                <Link className="user-profile" href={`/${user.username}`}>
                    <div className="flex">
                        <div className="flex-left">
                            <span className="user-name">{user.name !== "" ? user.name : user.username}</span>
                            <span className="text-muted">@{user.username}</span>
                        </div>
                        {token && user.username !== token.username && <Follow profile={user} />}
                    </div>
                    <span className="user-desc">{user.description} ykuC</span>
                </Link>
            </div>
        </>
    );
}

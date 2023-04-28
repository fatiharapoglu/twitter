import { Avatar } from "@mui/material";
import Link from "next/link";

import { AuthorProps } from "@/types/AuthorProps";

export default function User({ user }: { user: AuthorProps }) {
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
                        <button className="btn btn-dark">Follow</button>
                    </div>
                    <span className="user-desc">{user.description} ykuC</span>
                </Link>
            </div>
        </>
    );
}

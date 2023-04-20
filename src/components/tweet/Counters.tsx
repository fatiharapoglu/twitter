import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { TweetProps } from "@/types/TweetProps";
import User from "../user/User";

export default function Counters({ tweet }: { tweet: TweetProps }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {tweet.likedBy.length <= 0 ? null : (
                <div className="tweet-stats">
                    <div className="counters">
                        <button className="counter-btn" onClick={handleClick}>
                            {tweet.likedBy.length <= 0 ? null : (
                                <span className="count">
                                    {tweet.likedBy.length} <span className="text-muted">Likes</span>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            )}
            <Dialog className="dialog" open={isOpen} onClose={handleClose} fullWidth>
                <DialogTitle className="title">Liked by</DialogTitle>
                <DialogContent sx={{ paddingX: 0 }}>
                    <div className="user-list">
                        {tweet.likedBy.map((user) => (
                            <div className="user-wrapper" key={user.id}>
                                <User user={user} />
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { TweetProps } from "@/types/TweetProps";
import User from "../user/User";
import { AuthContext } from "@/app/(twitter)/layout";
import { scrollToBottom } from "@/utilities/misc/scrollToBottom";
import CustomSnackbar from "../misc/CustomSnackbar";
import { SnackbarProps } from "@/types/SnackbarProps";
import { UserProps } from "@/types/UserProps";

export default function Counters({ tweet }: { tweet: TweetProps }) {
    const [dialogType, setDialogType] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarProps>({ message: "", severity: "success", open: false });

    const { token } = useContext(AuthContext);

    const handleDialogOpen = (type: string) => {
        if (!token) {
            return setSnackbar({
                message: "You need to log in to view likes or retweets.",
                severity: "info",
                open: true,
            });
        }

        setDialogType(type);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogType("");
        setIsDialogOpen(false);
    };

    return (
        <>
            {tweet.likedBy.length === 0 && tweet.retweetedBy.length === 0 ? null : (
                <div className="tweet-stats">
                    <div className="counters">
                        {tweet.replies.length > 0 && (
                            <button className="counter-btn" onClick={scrollToBottom}>
                                <span className="count">
                                    {tweet.replies.length} <span className="text-muted">Replies</span>
                                </span>
                            </button>
                        )}
                        {tweet.retweetedBy.length > 0 && (
                            <button className="counter-btn" onClick={() => handleDialogOpen("retweets")}>
                                <span className="count">
                                    {tweet.retweetedBy.length} <span className="text-muted">Retweets</span>
                                </span>
                            </button>
                        )}
                        {tweet.likedBy.length > 0 && (
                            <button className="counter-btn" onClick={() => handleDialogOpen("likes")}>
                                <span className="count">
                                    {tweet.likedBy.length} <span className="text-muted">Likes</span>
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            )}
            {isDialogOpen && (
                <Dialog className="dialog" open={isDialogOpen} onClose={handleDialogClose} fullWidth>
                    <DialogTitle className="title">
                        {dialogType === "likes" ? "Liked by" : dialogType === "retweets" ? "Retweeted by" : ""}
                    </DialogTitle>
                    <DialogContent sx={{ paddingX: 0 }}>
                        <div className="user-list">
                            {dialogType === "likes"
                                ? tweet.likedBy.map((user: UserProps) => (
                                      <div className="user-wrapper" key={"like-" + user.id}>
                                          <User user={user} />
                                      </div>
                                  ))
                                : tweet.retweetedBy.map((user: UserProps) => (
                                      <div className="user-wrapper" key={"retweet-" + user.id}>
                                          <User user={user} />
                                      </div>
                                  ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            {snackbar.open && (
                <CustomSnackbar message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar} />
            )}
        </>
    );
}

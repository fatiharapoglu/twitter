import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { TweetProps } from "@/types/TweetProps";
import User from "../user/User";
import { AuthContext } from "@/app/(twitter)/layout";

export default function Counters({ tweet }: { tweet: TweetProps }) {
    const [dialogType, setDialogType] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { token } = useContext(AuthContext);

    const handleDialogOpen = (type: string) => {
        if (!token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
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
            {tweet.likedBy.length === 0 && tweet.retweets.length === 0 ? null : (
                <div className="tweet-stats">
                    <div className="counters">
                        {tweet.retweets.length > 0 && (
                            <button className="counter-btn" onClick={() => handleDialogOpen("retweets")}>
                                <span className="count">
                                    {tweet.retweets.length} <span className="text-muted">Retweets</span>
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
                                ? tweet.likedBy.map((user) => (
                                      <div className="user-wrapper" key={"like-" + user.id}>
                                          <User user={user} />
                                      </div>
                                  ))
                                : tweet.retweets.map((retweet) => {
                                      console.log(retweet);
                                      return (
                                          <div className="user-wrapper" key={"retweet-" + retweet.retweetedBy.id}>
                                              <User user={retweet.retweetedBy} />
                                          </div>
                                      );
                                  })}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

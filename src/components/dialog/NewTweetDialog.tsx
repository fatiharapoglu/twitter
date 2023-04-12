import { Dialog } from "@mui/material";

import { NewTweetDialogProps } from "@/types/DialogProps";
import NewTweet from "../NewTweet";

export default function NewTweetDialog({ open, handleNewTweetClose, token }: NewTweetDialogProps) {
    return (
        <Dialog className="dialog" open={open} onClose={handleNewTweetClose}>
            <div className="new-tweet-wrapper">
                <NewTweet token={token} />
            </div>
        </Dialog>
    );
}

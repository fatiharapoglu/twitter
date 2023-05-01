import Image from "next/image";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { LogOutDialogProps } from "@/types/DialogProps";
import CircularLoading from "../misc/CircularLoading";

export default function LogOutDialog({ open, handleLogOutClose, logout, isLoggingOut }: LogOutDialogProps) {
    return (
        <Dialog className="dialog" open={open} onClose={handleLogOutClose}>
            <Image className="dialog-icon" src="/assets/favicon.png" alt="" width={40} height={40} />
            <DialogTitle className="title">{isLoggingOut ? "Logging out..." : "Log out of Twitter?"}</DialogTitle>
            <DialogContent>
                <DialogContentText className="text-muted">You can always log back in at any time.</DialogContentText>
            </DialogContent>
            {isLoggingOut ? (
                <CircularLoading />
            ) : (
                <div className="logout-buttons button-group">
                    <button className="btn btn-dark" onClick={logout} autoFocus>
                        Log out
                    </button>
                    <button className="btn btn-white" onClick={handleLogOutClose}>
                        Cancel
                    </button>
                </div>
            )}
        </Dialog>
    );
}

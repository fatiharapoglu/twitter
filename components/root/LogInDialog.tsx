import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DialogProps = {
    open: boolean;
    handleLogInClose: () => void;
};

export default function LogInDialog({ open, handleLogInClose }: DialogProps) {
    return (
        <Dialog open={open} onClose={handleLogInClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send
                    updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <button onClick={handleLogInClose}>Cancel</button>
                <button onClick={handleLogInClose}>Subscribe</button>
            </DialogActions>
        </Dialog>
    );
}

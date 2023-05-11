import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { SnackbarProps } from "@/types/SnackbarProps";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({
    message,
    severity = "success",
    setSnackbar,
}: {
    message: string;
    severity: "success" | "error" | "warning" | "info";
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarProps>>;
}) {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar({ message, severity, open: false });
    };

    return (
        <Snackbar
            open={true}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%", fontSize: "0.66rem" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

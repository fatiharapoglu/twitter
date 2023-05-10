import { useState } from "react";
import { FiShare } from "react-icons/fi";

import { SnackbarProps } from "@/types/SnackbarProps";
import CustomSnackbar from "../misc/CustomSnackbar";

export default function Share({ tweetUrl }: { tweetUrl: string }) {
    const [snackbar, setSnackbar] = useState<SnackbarProps>({ message: "", severity: "success", open: false });

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(tweetUrl);
            setSnackbar({ message: "Tweet link is copied to the clipboard.", severity: "success", open: true });
        } catch (error) {
            return console.log(error);
        }
    };

    return (
        <>
            <button className="icon share" onClick={handleCopy}>
                <FiShare />
            </button>
            {snackbar.open && (
                <CustomSnackbar message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar} />
            )}
        </>
    );
}

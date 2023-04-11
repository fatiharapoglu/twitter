import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <div className="loading-wrapper">
            <CircularProgress size={30} />
        </div>
    );
}

import { CircularProgress } from "@mui/material";

export default function ProgressCircle({ maxChars, count }: { maxChars: number; count: number }) {
    const progress = (count / maxChars) * 100;

    return (
        <div className="progress-circle">
            {count > 0 && (
                <span className={`progress-text ${count > maxChars ? "error" : ""}`}>{`${count} / ${maxChars}`}</span>
            )}
            <CircularProgress
                variant="determinate"
                value={progress >= 100 ? 100 : progress}
                color={progress > 100 ? "error" : "inherit"}
                size={20}
                thickness={5}
            />
        </div>
    );
}

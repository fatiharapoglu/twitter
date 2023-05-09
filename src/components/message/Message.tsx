import { MessageProps } from "@/types/MessageProps";
import { formatDate } from "@/utilities/date";

export default function Message({ message, messagedUsername }: { message: MessageProps; messagedUsername: string }) {
    return (
        <div className={`message ${message.sender.username === messagedUsername ? "message-left" : "message-right"}`}>
            <div className="message-text">{message.text} </div>
            <div className="message-date text-muted">{formatDate(message.createdAt)}</div>
        </div>
    );
}

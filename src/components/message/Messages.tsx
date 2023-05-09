import { FaArrowLeft } from "react-icons/fa";

import Message from "./Message";
import NewMessageBox from "./NewMessageBox";
import { MessagesProps } from "@/types/MessageProps";

export default function Messages({ selectedMessages, messagedUsername, handleConversations, token }: MessagesProps) {
    return (
        <main className="messages-container">
            <div className="back-to">
                <button className="icon-hoverable btn btn-white" onClick={() => handleConversations(false)}>
                    <FaArrowLeft />
                </button>
                <div className="top">
                    <span className="top-title">{messagedUsername}</span>
                </div>
            </div>
            <div className="messages-wrapper">
                {selectedMessages.map((message) => (
                    <Message key={message.id} message={message} messagedUsername={messagedUsername} />
                ))}
            </div>
            <NewMessageBox messagedUsername={messagedUsername} token={token} />
        </main>
    );
}

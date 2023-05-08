"use client";

import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BsEnvelopePlus } from "react-icons/bs";

import NothingToShow from "@/components/misc/NothingToShow";
import NewMessageDialog from "@/components/dialog/NewMessageDialog";
import { AuthContext } from "../layout";
import CircularLoading from "@/components/misc/CircularLoading";
import { getUserMessages } from "@/utilities/fetch";
import Conversation from "@/components/message/Conversation";
import { ConversationResponse } from "@/types/MessageProps";
import Messages from "@/components/message/Messages";

export default function MessagesPage() {
    const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
    const [isConversationSelected, setIsConversationSelected] = useState({ selected: false, messages: [] });

    const { token, isPending } = useContext(AuthContext);

    const { isLoading, data, isFetched } = useQuery({
        queryKey: ["messages", token && token.username],
        queryFn: () => token && getUserMessages(token.username),
        enabled: !!token,
    });

    const handleNewMessageClose = () => {
        setIsNewMessageOpen(false);
    };

    const handleConversations = (isSelected: boolean, messages: any = []) => {
        setIsConversationSelected({ selected: isSelected, messages });
    };

    if (isPending || !token || isLoading) return <CircularLoading />;

    const conversations = data.formattedConversations;

    return (
        <>
            <main className="messages">
                <h1 className="page-name">
                    Messages
                    <button onClick={() => setIsNewMessageOpen(true)} className="btn btn-white icon-hoverable new-message">
                        <BsEnvelopePlus />
                    </button>
                </h1>
                {isFetched && !data && <NothingToShow />}
                {!isConversationSelected.selected && (
                    <div>
                        {conversations.map((conversation: ConversationResponse) => {
                            return (
                                <Conversation
                                    key={conversation.participants.join("+")}
                                    conversation={conversation}
                                    token={token}
                                    handleConversations={handleConversations}
                                />
                            );
                        })}
                    </div>
                )}
                {isConversationSelected.selected && (
                    <Messages selectedMessages={isConversationSelected.messages} handleConversations={handleConversations} />
                )}
            </main>
            <NewMessageDialog handleNewMessageClose={handleNewMessageClose} open={isNewMessageOpen} token={token} />
        </>
    );
}

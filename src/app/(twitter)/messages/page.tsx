"use client";

import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BsEnvelopePlus } from "react-icons/bs";

import NothingToShow from "@/components/misc/NothingToShow";
import NewMessageDialog from "@/components/dialog/NewMessageDialog";
import { AuthContext } from "../layout";
import CircularLoading from "@/components/misc/CircularLoading";
import { getUserMessages } from "@/utilities/fetch";

export default function MessagesPage() {
    const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

    const { token, isPending } = useContext(AuthContext);

    const { isLoading, data, isFetched } = useQuery({
        queryKey: ["messages", token && token.username],
        queryFn: () => token && getUserMessages(token.username),
        enabled: !!token,
    });

    const handleNewMessageClose = () => {
        setIsNewMessageOpen(false);
    };

    if (isPending || !token) return <CircularLoading />;

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
                {isLoading ? (
                    <CircularLoading />
                ) : (
                    data?.messages.map((message) => (
                        <div key={message.id} className="message">
                            <div className="message-content">{message.text}</div>
                        </div>
                    ))
                )}
            </main>
            <NewMessageDialog handleNewMessageClose={handleNewMessageClose} open={isNewMessageOpen} token={token} />
        </>
    );
}

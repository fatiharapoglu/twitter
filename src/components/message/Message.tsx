import { MessageProps } from "@/types/MessageProps";
import { useState } from "react";
import Image from "next/image";

import { formatDate } from "@/utilities/date";
import { getFullURL } from "@/utilities/misc/getFullURL";
import PreviewDialog from "../dialog/PreviewDialog";
import { shimmer } from "@/utilities/misc/shimmer";

export default function Message({ message, messagedUsername }: { message: MessageProps; messagedUsername: string }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handlePreviewClick();
    };
    const handlePreviewClick = () => {
        setIsPreviewOpen(true);
    };
    const handlePreviewClose = () => {
        setIsPreviewOpen(false);
    };

    return (
        <div className={`message ${message.sender.username === messagedUsername ? "message-left" : "message-right"}`}>
            <div className="message-text">{message.text}</div>
            {message.photoUrl && (
                <>
                    <div className="message-image">
                        <Image
                            onClick={handleImageClick}
                            src={getFullURL(message.photoUrl)}
                            alt="message image"
                            placeholder="blur"
                            blurDataURL={shimmer(250, 250)}
                            height={250}
                            width={250}
                        />
                    </div>
                    <PreviewDialog open={isPreviewOpen} handlePreviewClose={handlePreviewClose} url={message.photoUrl} />
                </>
            )}
            <div className="message-date text-muted">{formatDate(message.createdAt)}</div>
        </div>
    );
}

import { UserProps } from "./UserProps";

export type MessageProps = {
    sender: UserProps;
    recipient: UserProps;
    text: string;
    createdAt: Date;
    photoUrl: string;
};

export type ConversationResponse = {
    participants: string[];
    messages: MessageProps[];
};

export type ConversationProps = {
    conversation: ConversationResponse;
    token: UserProps;
    handleConversations: (isSelected: boolean, messages: any, messagedUser: string | undefined) => void;
};

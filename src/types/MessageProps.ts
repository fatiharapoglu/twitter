export type Message = {
    sender: {
        username: string;
    };
    recipient: {
        username: string;
    };
};

export type Conversation = {
    participants: string[];
    messages: Message[];
};

import { UserProps } from "./UserProps";

export type TweetProps = {
    id: string;
    text: string;
    createdAt: Date;
    author: UserProps;
    authorId: string;
    photoUrl: string;
    likedBy: UserProps[];
    retweets: TweetProps[];
    replies: TweetProps[];
    isRetweet: boolean;
    retweetedBy: UserProps[];
    retweetedById: string;
    retweetOf: TweetProps;
    isReply: boolean;
    repliedTo: TweetProps;
    repliedToId: string;
};

export type TweetsArray = {
    tweets: TweetProps[];
};

export type TweetResponse = {
    success: boolean;
    tweet: TweetProps;
};

export type TweetOptionsProps = {
    tweetId: string;
    tweetAuthor: string;
};

export type NewTweetProps = {
    token: UserProps;
    handleSubmit?: () => void;
};

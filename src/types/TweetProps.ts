import { UserProps } from "./UserProps";

export type TweetProps = {
    id: string;
    text: string;
    createdAt: Date;
    author: UserProps;
    authorId: string;
    photoUrl: string;
    likedBy: UserProps[];
    retweets: RetweetProps[];
    parentId: null | string;
};

export type RetweetProps = {
    id: string;
    createdAt: Date;
    retweetedBy: UserProps;
    retweetedById: string;
    tweetOrigin: TweetProps;
    tweetOriginId: string;
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

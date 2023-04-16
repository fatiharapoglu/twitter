import { AuthorProps } from "./AuthorProps";

export type TweetProps = {
    id: string;
    text: string;
    createdAt: Date;
    author: AuthorProps;
    authorId: string;
    likedBy: AuthorProps[];
    parentId: null | string;
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
    token: AuthorProps;
    handleSubmit?: () => void;
};

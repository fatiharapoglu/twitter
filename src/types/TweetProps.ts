import { AuthorProps } from "./AuthorProps";

export type TweetProps = {
    id: string;
    text: string;
    createdAt: Date;
    author: AuthorProps;
    authorId: string;
    likedById: null | string;
    parentId: null | string;
};

export type TweetsArray = {
    tweets: TweetProps[];
};

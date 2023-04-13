import { AuthorProps } from "./AuthorProps";

export type NewTweetProps = {
    token: AuthorProps;
    handleSubmit?: () => void;
};

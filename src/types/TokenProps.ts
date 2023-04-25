import { AuthorProps } from "./AuthorProps";

export type VerifiedToken = AuthorProps | null;

export type AuthProps = {
    token: VerifiedToken;
    isPending: boolean;
};

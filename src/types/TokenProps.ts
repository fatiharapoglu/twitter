import { UserProps } from "./UserProps";

export type VerifiedToken = UserProps | null;

export type AuthProps = {
    token: VerifiedToken;
    isPending: boolean;
    refreshToken: () => Promise<void>;
};

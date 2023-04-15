import { AuthorProps } from "./AuthorProps";

export type LogInDialogProps = {
    open: boolean;
    handleLogInClose: () => void;
};

export type SignUpDialogProps = {
    open: boolean;
    handleSignUpClose: () => void;
};

export type NewTweetDialogProps = {
    open: boolean;
    handleNewTweetClose: () => void;
    token: AuthorProps;
};

export type LogOutDialogProps = {
    open: boolean;
    handleLogOutClose: () => void;
    logout: () => void;
};

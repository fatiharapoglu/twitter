import { UserProps } from "./UserProps";

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
    token: UserProps;
};

export type LogOutDialogProps = {
    open: boolean;
    handleLogOutClose: () => void;
    logout: () => void;
};

export type PreviewDialogProps = {
    open: boolean;
    handlePreviewClose: () => void;
    url: string;
};

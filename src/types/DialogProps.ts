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
    isLoggingOut: boolean;
};

export type PreviewDialogProps = {
    open: boolean;
    handlePreviewClose: () => void;
    url: string;
};

export type NewMessageDialogProps = {
    open: boolean;
    handleNewMessageClose: () => void;
    token: UserProps;
};

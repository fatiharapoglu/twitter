export type UserProps = {
    id: string;
    name: string;
    username: string;
    description: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    photoUrl: string;
    headerUrl: string;
    followers: UserProps[];
    following: UserProps[];
};

export type UserResponse = {
    success: boolean;
    user: UserProps;
};

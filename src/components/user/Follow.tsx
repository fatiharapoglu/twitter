import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "@/app/(twitter)/layout";
import { updateUserFollows } from "@/utilities/fetch";
import { UserProps, UserResponse } from "@/types/UserProps";

export default function Follow({ profile }: { profile: UserProps }) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { token, isPending } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const queryKey = ["users", profile.username];

    const followMutation = useMutation({
        mutationFn: (tokenOwnerId: string) => updateUserFollows(profile.username, tokenOwnerId, false),
        onMutate: async (tokenOwnerId: string) => {
            setIsButtonDisabled(true);
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previous = queryClient.getQueryData<UserResponse>(queryKey);
            setIsFollowed(true);
            if (previous) {
                queryClient.setQueryData(queryKey, {
                    ...previous,
                    user: {
                        ...previous.user,
                        followers: [...previous.user.followers, tokenOwnerId],
                    },
                });
            }
            return { previous };
        },
        onError: (err, variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    const unfollowMutation = useMutation({
        mutationFn: (tokenOwnerId: string) => updateUserFollows(profile.username, tokenOwnerId, true),
        onMutate: async (tokenOwnerId: string) => {
            setIsButtonDisabled(true);
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previous = queryClient.getQueryData<UserResponse>(queryKey);
            setIsFollowed(false);
            if (previous) {
                queryClient.setQueryData(queryKey, {
                    ...previous,
                    user: {
                        ...previous.user,
                        followers: previous.user.followers.filter((user) => JSON.stringify(user.id) !== tokenOwnerId),
                    },
                });
            }
            return { previous };
        },
        onError: (err, variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    const handleFollowclick = () => {
        if (!token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
        }

        const tokenOwnerId = JSON.stringify(token.id);
        const followers = profile.followers;
        const isFollowedByTokenOwner = followers?.some((user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId);

        if (!followMutation.isLoading && !followMutation.isLoading) {
            if (isFollowedByTokenOwner) {
                unfollowMutation.mutate(tokenOwnerId);
            } else {
                followMutation.mutate(tokenOwnerId);
            }
        }
    };

    useEffect(() => {
        if (!isPending && token) {
            const tokenOwnerId = JSON.stringify(token.id);
            const followers = profile.followers;
            const isFollowedByTokenOwner = followers?.some(
                (user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId
            );
            setIsFollowed(isFollowedByTokenOwner);
        }
    }, [isPending]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [isButtonDisabled]);

    return (
        <button onClick={handleFollowclick} className="btn btn-dark" disabled={isButtonDisabled}>
            {isFollowed ? "Following" : "Follow"}
        </button>
    );
}

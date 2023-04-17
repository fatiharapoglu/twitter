import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { TweetOptionsProps, TweetResponse } from "@/types/TweetProps";
import { getUserTweet, updateTweetLikes } from "@/utilities/fetch";
import useAuth from "@/hooks/useAuth";

export default function Like({ tweetId, tweetAuthor }: TweetOptionsProps) {
    const [isLiked, setIsLiked] = useState(false);

    const queryClient = useQueryClient();
    const auth = useAuth();

    const queryKey = ["tweets", tweetAuthor, tweetId];

    const { isFetched, data } = useQuery({
        queryKey: queryKey,
        queryFn: () => getUserTweet(tweetId, tweetAuthor),
    });

    const likeMutation = useMutation({
        mutationFn: (tokenOwnerId: string) => updateTweetLikes(tweetId, tweetAuthor, tokenOwnerId, false),
        onMutate: async (tokenOwnerId: string) => {
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previousTweet = queryClient.getQueryData<TweetResponse>(queryKey);
            setIsLiked(true);
            if (previousTweet) {
                queryClient.setQueryData(queryKey, {
                    ...previousTweet,
                    tweet: {
                        ...previousTweet.tweet,
                        likedBy: [...previousTweet.tweet.likedBy, tokenOwnerId],
                    },
                });
            }
            return { previousTweet };
        },
        onError: (err, variables, context) => {
            if (context?.previousTweet) {
                queryClient.setQueryData<TweetResponse>(queryKey, context.previousTweet);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    const unlikeMutation = useMutation({
        mutationFn: (tokenOwnerId) => updateTweetLikes(tweetId, tweetAuthor, tokenOwnerId, true),
        onMutate: async (tokenOwnerId: string) => {
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previousTweet = queryClient.getQueryData<TweetResponse>(queryKey);
            setIsLiked(false);
            if (previousTweet) {
                queryClient.setQueryData(queryKey, {
                    ...previousTweet,
                    tweet: {
                        ...previousTweet.tweet,
                        likedBy: previousTweet.tweet.likedBy.filter((user) => JSON.stringify(user.id) !== tokenOwnerId),
                    },
                });
            }
            return { previousTweet };
        },
        onError: (err, variables, context) => {
            if (context?.previousTweet) {
                queryClient.setQueryData<TweetResponse>(queryKey, context.previousTweet);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });

    const handleLike = () => {
        if (!auth.token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
        }

        const tokenOwnerId = JSON.stringify(auth.token.id);
        const likedBy = data.tweet?.likedBy;
        const isLikedByTokenOwner = likedBy.some((user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId);

        if (isLikedByTokenOwner) {
            unlikeMutation.mutate(tokenOwnerId);
        } else {
            likeMutation.mutate(tokenOwnerId);
        }
    };

    useEffect(() => {
        if (!auth.isPending && isFetched) {
            const tokenOwnerId = JSON.stringify(auth?.token?.id);
            const likedBy = data?.tweet?.likedBy;
            const isLikedByTokenOwner = likedBy.some((user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId);
            setIsLiked(isLikedByTokenOwner);
        }
    }, [auth.isPending, isFetched]);

    return (
        <button onClick={handleLike} className="icon like">
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span className="count">{data?.tweet?.likedBy?.length === 0 ? "" : data?.tweet?.likedBy?.length}</span>
        </button>
    );
}

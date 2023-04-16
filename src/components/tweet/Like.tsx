import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa";

import { TweetOptionsProps, TweetResponse } from "@/types/TweetProps";
import { getUserTweet, updateTweetLikes } from "@/utilities/fetch";
import useAuth from "@/hooks/useAuth";

export default function Like({ tweetId, tweetAuthor }: TweetOptionsProps) {
    const queryClient = useQueryClient();
    const auth = useAuth();

    const queryKey = ["tweets", tweetAuthor, tweetId];

    const { data } = useQuery({
        queryKey: queryKey,
        queryFn: () => getUserTweet(tweetId, tweetAuthor),
    });

    const mutation = useMutation({
        mutationFn: (tokenOwnerId) => updateTweetLikes(tweetId, tweetAuthor, tokenOwnerId),
        onMutate: async (tokenOwnerId: string) => {
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previousTweet = queryClient.getQueryData<TweetResponse>(queryKey);
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

    const handleLike = () => {
        if (!auth.token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
        }
        const tokenOwnerId = JSON.stringify(auth.token.id);
        mutation.mutate(tokenOwnerId);
    };

    return (
        <button onClick={handleLike} className="icon like">
            <FaRegHeart />
            <span className="count">{data?.tweet?.likedBy?.length === 0 ? "" : data?.tweet?.likedBy?.length}</span>
        </button>
    );
}

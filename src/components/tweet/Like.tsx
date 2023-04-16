import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa";

import { TweetOptionsProps } from "@/types/TweetOptionsProps";
import { getUserTweet, updateTweetLikes } from "@/utilities/fetch";
import useAuth from "@/hooks/useAuth";

export default function Like({ tweetId, tweetAuthor }: TweetOptionsProps) {
    const queryClient = useQueryClient();
    const auth = useAuth();
    let tokenOwnerId: string;

    const tweet = useQuery({
        queryKey: ["tweets", tweetAuthor, tweetId],
        queryFn: () => getUserTweet(tweetId, tweetAuthor),
    });

    const mutation = useMutation({
        mutationFn: () => updateTweetLikes(tweetId, tweetAuthor, tokenOwnerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tweets", tweetAuthor, tweetId] });
        },
    });

    const handleLike = () => {
        if (!auth.token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
        }
        tokenOwnerId = JSON.stringify(auth.token.id);
        mutation.mutate();
    };

    return (
        <div>
            <button onClick={handleLike} className="icon like">
                <FaRegHeart />
                <span className="count">
                    {tweet.isFetched && tweet.data?.tweet.likedBy?.length === 0 ? "" : tweet.data?.tweet.likedBy?.length}
                </span>
            </button>
        </div>
    );
}

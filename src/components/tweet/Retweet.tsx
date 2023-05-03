import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { TweetOptionsProps } from "@/types/TweetProps";
import { AuthContext } from "@/app/(twitter)/layout";
import { getUserTweet, updateRetweets } from "@/utilities/fetch";
import RetweetIcon from "../misc/RetweetIcon";

export default function Retweet({ tweetId, tweetAuthor }: TweetOptionsProps) {
    const [isRetweeted, setIsRetweeted] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { token, isPending } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const queryKey = ["tweets", tweetAuthor, tweetId];

    const { isFetched, data } = useQuery({
        queryKey: queryKey,
        queryFn: () => getUserTweet(tweetId, tweetAuthor),
    });

    const mutation = useMutation({
        mutationFn: (tokenOwnerId: string) => updateRetweets(tweetId, tweetAuthor, tokenOwnerId, isRetweeted),
        onMutate: () => {
            setIsButtonDisabled(true);
        },
        onSuccess: () => {
            setIsButtonDisabled(false);
            setIsRetweeted(!isRetweeted);
            queryClient.invalidateQueries({ queryKey: ["tweets"] });
        },
        onError: () => {
            console.log("Something went wrong while retweeting");
            setIsButtonDisabled(false);
        },
    });

    const handleRetweet = () => {
        if (!token) {
            return alert("You are not logged in, you can't do that before log in.");
            // snackbar or modal here
        }

        const tokenOwnerId = JSON.stringify(token.id);
        mutation.mutate(tokenOwnerId);
    };

    useEffect(() => {
        if (!isPending && isFetched) {
            const tokenOwnerId = JSON.stringify(token?.id);
            const retweetedBy = data?.tweet?.retweetedBy;
            const isRetweetedBy = retweetedBy?.some((user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId);
            setIsRetweeted(isRetweetedBy);
        }
    }, [isPending, isFetched]);

    return (
        <motion.button
            className={`icon retweet ${isRetweeted ? "active" : ""}`}
            onClick={handleRetweet}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: isRetweeted ? [1, 1.5, 1.2, 1] : 1 }}
            transition={{ duration: 0.25 }}
            disabled={isButtonDisabled}
        >
            <motion.span animate={{ scale: [1, 1.5, 1.2, 1] }} transition={{ duration: 0.25 }}>
                <RetweetIcon />
            </motion.span>
            <motion.span animate={{ scale: isRetweeted ? [0, 1.2, 1] : 0 }} transition={{ duration: 0.25 }} />
            {data?.tweet?.retweetedBy?.length === 0 ? null : (
                <span className="count">{data?.tweet?.retweetedBy?.length}</span>
            )}
        </motion.button>
    );
}

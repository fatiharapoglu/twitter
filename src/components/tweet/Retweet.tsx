import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { TweetOptionsProps } from "@/types/TweetProps";
import { AuthContext } from "@/app/(twitter)/layout";
import { getUserTweet, updateRetweets } from "@/utilities/fetch";
import RetweetIcon from "../misc/RetweetIcon";
import { SnackbarProps } from "@/types/SnackbarProps";
import CustomSnackbar from "../misc/CustomSnackbar";

export default function Retweet({ tweetId, tweetAuthor }: TweetOptionsProps) {
    const [isRetweeted, setIsRetweeted] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarProps>({ message: "", severity: "success", open: false });

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
    });

    const handleRetweet = () => {
        if (!token) {
            return setSnackbar({
                message: "You need to login to retweet.",
                severity: "info",
                open: true,
            });
        }

        if (mutation.isLoading) return;

        const tokenOwnerId = JSON.stringify(token?.id);
        const retweetedBy = data?.tweet?.retweetedBy;
        const isRetweetedBy = retweetedBy?.some((user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId);

        if (isRetweeted !== isRetweetedBy) setIsRetweeted(isRetweetedBy);

        mutation.mutate(tokenOwnerId);
    };

    useEffect(() => {
        if (!isPending && isFetched) {
            const tokenOwnerId = JSON.stringify(token?.id);
            const retweetedBy = data?.tweet?.retweetedBy;
            const isRetweetedBy = retweetedBy?.some((user: { id: string }) => JSON.stringify(user.id) === tokenOwnerId);
            setIsRetweeted(isRetweetedBy);
        }
    }, [isPending, isFetched, data]);

    return (
        <>
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
            {snackbar.open && (
                <CustomSnackbar message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar} />
            )}
        </>
    );
}

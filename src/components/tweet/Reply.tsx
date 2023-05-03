import { FaRegComment } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { TweetProps } from "@/types/TweetProps";

export default function Reply({ tweet }: { tweet: TweetProps }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${tweet.author.username}/tweets/${tweet.id}`);
    };

    return (
        <button className="icon reply" onClick={handleClick}>
            <FaRegComment /> {tweet.replies.length === 0 ? null : <span className="count">{tweet.replies.length}</span>}
        </button>
    );
}

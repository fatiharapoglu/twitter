import NewTweet from "@/components/home/NewTweet";
import Tweets from "@/components/home/Tweets";
import { getAllTweets } from "@/utilities/fetch";

export default async function HomePage() {
    const { tweets } = await getAllTweets();

    return (
        <main className="center">
            <h1>Home</h1>
            <NewTweet />
            <Tweets tweets={tweets} />
        </main>
    );
}

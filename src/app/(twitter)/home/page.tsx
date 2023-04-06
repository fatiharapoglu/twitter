import NewTweet from "@/components/home/NewTweet";
import Tweets from "@/components/home/Tweets";

export default function HomePage() {
    return (
        <main className="center">
            <NewTweet />
            <Tweets />
        </main>
    );
}

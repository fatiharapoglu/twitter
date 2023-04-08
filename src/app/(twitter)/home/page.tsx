import NewTweet from "@/components/home/NewTweet";
import Tweets from "@/components/home/Tweets";

export default async function HomePage() {
    return (
        <main className="center">
            <h1>Home</h1>
            <NewTweet />
            <Tweets />
        </main>
    );
}

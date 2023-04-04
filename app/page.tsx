import Image from "next/image";

export default function Home() {
    return (
        <>
            <main className="homepage">
                <div className="homepage-left">
                    <Image src="/assets/homepage.jpg" alt="twitter" fill />
                    <div className="homepage-left-logo">
                        <Image src="/assets/favicon.png" alt="" width={120} height={120} />
                    </div>
                </div>
                <div className="homepage-right">
                    <Image src="/assets/favicon.png" alt="" width={50} height={50} />
                    <h1>See what&apos;s happening in the world right now</h1>
                    <p>Join Twitter today.</p>
                    <div className="button-group">
                        <button className="btn btn-sign-up">Sign Up</button>
                        <button className="btn">Log In</button>
                        <button className="btn">
                            Test Account <span>(?)</span>
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

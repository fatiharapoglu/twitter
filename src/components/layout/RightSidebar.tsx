"use client";

import Search from "../misc/Search";

export default function RightSidebar() {
    return (
        <aside className="right-sidebar">
            <div className="fixed">
                <Search />
                <div>Who to follow</div>
                <div>New to twitter?</div>
            </div>
        </aside>
    );
}

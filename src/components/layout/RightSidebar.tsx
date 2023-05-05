"use client";

import Search from "../misc/Search";
import WhoToFollow from "../misc/WhoToFollow";

export default function RightSidebar() {
    return (
        <aside className="right-sidebar">
            <div className="fixed">
                <Search />
                <WhoToFollow />
            </div>
        </aside>
    );
}

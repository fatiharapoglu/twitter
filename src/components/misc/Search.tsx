import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { BsSearch } from "react-icons/bs";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/search?q=${encodedSearchQuery}`);
    };

    return (
        <div>
            <form className="search" onSubmit={onSearch}>
                <input
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Twitter"
                    required
                />
                <BsSearch />
            </form>
        </div>
    );
}

import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";

export default function BackToArrow({ title, url }: { title: string; url: string }) {
    return (
        <div className="back-to">
            <Link className="icon-hoverable" href={url}>
                <FaArrowLeft />
            </Link>
            <div className="top">
                <span className="top-title">{title}</span>
            </div>
        </div>
    );
}

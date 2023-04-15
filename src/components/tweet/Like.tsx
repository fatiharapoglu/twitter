import { FaRegHeart } from "react-icons/fa";

export default function Like() {
    const handleLike = () => {};

    return (
        <div>
            <button onClick={handleLike} className="icon like">
                <FaRegHeart />
            </button>
        </div>
    );
}

import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineClose } from "react-icons/ai";

import { AuthContext } from "@/app/(twitter)/layout";
import { getRandomThreeUsers } from "@/utilities/fetch";
import User from "../user/User";

export default function WhoToFollow() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    const { token } = useContext(AuthContext);
    const { data, isFetched } = useQuery(["random"], getRandomThreeUsers, { enabled: isEnabled });

    const handleClose = () => {
        setIsOpen(false);
        setIsEnabled(false);
    };

    useEffect(() => {
        if (isFetched) {
            setIsEnabled(false);
        }
    }, [data, isFetched]);

    return (
        <>
            {isOpen && token && data && data.users && data.users.length > 0 && (
                <div className="who-to-follow">
                    <h1>
                        Who to follow
                        <AiOutlineClose className="btn-close icon-hoverable follow-close" onClick={handleClose} />
                    </h1>
                    <div className="user-wrapper">
                        <User user={data.users[0]} />
                    </div>
                    {data.users.length > 1 && (
                        <div className="user-wrapper">
                            <User user={data.users[1]} />
                        </div>
                    )}
                    {data.users.length > 2 && (
                        <div className="user-wrapper">
                            <User user={data.users[2]} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

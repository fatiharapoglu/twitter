import React from "react";
import Cookies from "universal-cookie";

import { verifyJwtToken } from "@/utilities/auth";

const fromServer = async () => {
    const cookies = require("next/headers").cookies;
    const cookieList = cookies();
    const { value: token } = cookieList.get("token") ?? { value: null };
    const verifiedToken = token && (await verifyJwtToken(token));
    return verifiedToken;
};

export default function useAuth() {
    const [auth, setAuth] = React.useState(null);

    const getVerifiedToken = async () => {
        const cookies = new Cookies();
        const token = cookies.get("token") ?? null;
        const verifiedToken = token && (await verifyJwtToken(token));
        setAuth(verifiedToken);
    };

    React.useEffect(() => {
        getVerifiedToken();
    }, []);

    return auth;
}

useAuth.fromServer = fromServer;

// custom hook for authorization which works with server (fromServer) and client side

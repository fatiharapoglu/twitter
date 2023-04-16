import React from "react";
import Cookies from "universal-cookie";

import { verifyJwtToken } from "@/utilities/auth";
import { VerifiedToken } from "@/types/Token";

const fromServer = async () => {
    const cookies = require("next/headers").cookies;
    const cookieList = cookies();
    const { value: token } = cookieList.get("token") ?? { value: null };
    const verifiedToken = token && (await verifyJwtToken(token));
    return verifiedToken;
};

export default function useAuth() {
    const useRouter = require("next/navigation").useRouter;
    const router = useRouter();

    const [token, setToken] = React.useState<VerifiedToken>(null);
    const [isPending, setIsPending] = React.useState<boolean>(true);

    const getVerifiedToken = async () => {
        const cookies = new Cookies();
        const token = cookies.get("token") ?? null;
        const verifiedToken = token && (await verifyJwtToken(token));
        setToken(verifiedToken);
        setIsPending(false);
    };

    React.useEffect(() => {
        getVerifiedToken();
    }, []);

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("token");
        setToken(null);
        router.push("/");
    };

    return { token, isPending, logout };
}

useAuth.fromServer = fromServer;

// Custom hook for authorization which works with server (fromServer) and client side

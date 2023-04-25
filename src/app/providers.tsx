"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";

import { AuthProps } from "@/types/TokenProps";
import useAuth from "@/hooks/useAuth";

const queryClient = new QueryClient();

export const AuthContext = createContext<AuthProps>({ token: null, isPending: true });

export default function Providers({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </AuthContext.Provider>
    );
}

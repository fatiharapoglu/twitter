"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalLoading from "@/components/misc/GlobalLoading";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export default function Providers({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState("loading");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, [theme]);

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme === "light" ? "light" : "dark",
                },
            }),
        [theme]
    );

    if (theme === "loading") return <GlobalLoading />;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={muiTheme}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

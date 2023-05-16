"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export default function Providers({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        setTheme(theme);
    }, []);

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme === "light" ? "light" : "dark",
                },
            }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={muiTheme}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

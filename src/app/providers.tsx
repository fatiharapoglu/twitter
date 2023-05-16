"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export default function Providers({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeContext.Provider>
    );
}

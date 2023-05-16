"use client";

import { useContext, useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { ThemeContext } from "@/app/providers";

export default function SettingsPage() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <main>
            <h1 className="page-name">Settings</h1>
            <div className="color-theme-switch">
                <h1>Color Theme</h1>
                <Switch checked={theme === "dark" ? true : false} onChange={toggleTheme} />
                <div>{theme === "dark" ? "Lights Out" : "Default"}</div>
            </div>
        </main>
    );
}

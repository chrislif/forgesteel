import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

type ThemeMode = "system" | "light" | "dark";
type ThemeContextValue = {
    mode: ThemeMode;                             // user's selected mode
    effectiveMode: Exclude<ThemeMode, "system">; // actually applied mode
    setMode: (m: ThemeMode) => void;
};

const STORAGE_KEY = "forgesteel-theme-setting";
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemPrefersDark(): boolean {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        return (saved as ThemeMode) || "system";
    });

    const [systemDark, setSystemDark] = useState<boolean>(() =>
        typeof window !== "undefined" ? getSystemPrefersDark() : false
    );

    // Keep in sync with OS when on "system"
    useEffect(() => {
        const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (!mq) return;

        const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
        mq.addEventListener?.("change", handler);
        // initialize (in case)
        setSystemDark(mq.matches);

        return () => mq.removeEventListener?.("change", handler);
    }, []);

    // Persist user choice
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    const effectiveMode: "light" | "dark" = useMemo(() => {
        if (mode === "system") return systemDark ? "dark" : "light";
        return mode;
    }, [mode, systemDark]);

    // Choose the AntD theme algorithm
    const algorithm =
        effectiveMode === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm;

    const value = useMemo(
        () => ({ mode, effectiveMode, setMode }),
        [mode, effectiveMode]
    );

    return (
        <ThemeContext.Provider value={value}>
            <ConfigProvider theme={{ algorithm }}>
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export function useThemeMode() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useThemeMode must be used within ThemeProvider");
    return ctx;
}

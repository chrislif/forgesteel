import React, { useEffect, useState, useMemo } from "react";
import { ConfigProvider, ThemeConfig, theme as antdTheme } from "antd";
import { useAppContext } from "../components/main/main";
import type { MapToken, SeedToken } from "antd/es/theme/interface";
import { SiteMapToken } from "./site-map-token";

export type ThemeMode = "system" | "light" | "dark";

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
    const { theme } = useAppContext();

    const [isSystemDark, setIsSystemDark] = useState<boolean>(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (!mediaQuery) return;

        setIsSystemDark(mediaQuery.matches);
        mediaQuery.addEventListener("change", (e) => setIsSystemDark(e.matches));
    }, []);

    const algorithm = useMemo(() => {
        if (theme === 'system') {
            return isSystemDark 
                ? siteDarkAlgorithm 
                : siteLightAlgorithm
        }
        else {
            return theme === 'dark' 
                ? siteDarkAlgorithm 
                : siteLightAlgorithm
        }
    }, [theme, isSystemDark]);

    return (
        <ConfigProvider 
            theme={{ 
                algorithm,
                components: {
                    Segmented: {
                        colorText: "#FFFFFF",
                        itemColor: "#000000",
                        itemHoverColor: "#FFFFFF",
                        itemHoverBg: "#050505",
                        itemActiveBg: "#000000",
                        trackBg: "#F5F5F5",
                        controlPaddingHorizontal: 20
                    }
                } 
            }}>
            {children}
        </ConfigProvider>
    );
};

const siteDarkAlgorithm: ThemeConfig["algorithm"] = (seed: SeedToken) => {
    const base = antdTheme.darkAlgorithm(seed);

    const next: MapToken = {
        ...base,
        colorBgBase: "#000000",
        colorTextBase: "#FFFFFF",

        fontSizeHeading1: SiteMapToken.fontSizeHeading1,
        colorBgContainer: "#FFFFFF",
        colorText: "#000000",
        colorPrimary: SiteMapToken.colorPrimary,
        colorSuccess: SiteMapToken.colorSuccess,
        colorWarning: SiteMapToken.colorWarning,
        colorError: SiteMapToken.colorError,
    }

    return next;
}

const siteLightAlgorithm: ThemeConfig["algorithm"] = (seed: SeedToken) => {
    const base = antdTheme.defaultAlgorithm(seed);

    const next: MapToken = {
        ...base,
        colorBgBase: "#FFFFFF",
        colorTextBase: "#000000",
        
        fontSizeHeading1: SiteMapToken.fontSizeHeading1,
        colorBgContainer: "#FFFFFF",
        colorText: "#000000",
        colorPrimary: SiteMapToken.colorPrimary,
        colorSuccess: SiteMapToken.colorSuccess,
        colorWarning: SiteMapToken.colorWarning,
        colorError:   SiteMapToken.colorError,
    }

    return next;
}

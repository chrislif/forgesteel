import { useMemo } from "react";
import { Button, Tooltip } from "antd";
import { LaptopOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useAppContext } from "../components/main/main";
import { ThemeMode } from "./theme-provider";

export const ThemeToggle = () => {
    const { theme, setTheme } = useAppContext();

    const nextTheme = (mode: ThemeMode): ThemeMode => {
        switch(mode) {
            case 'system':
                return 'light';
            case 'light':
                return 'dark';
            default:
                return 'system';
        }
    }

    const icon = useMemo(() => {
        switch (theme) {
            case "light":
                return <SunOutlined />;
            case "dark":
                return <MoonOutlined />;
            default:
                return <LaptopOutlined />;
        }
    }, [theme]);

    const handleClick = () => setTheme(nextTheme(theme));

    return (
        <Tooltip title={`Theme: ${theme} (click to switch)`}>
            <Button
                onClick={handleClick}
                icon={icon}
                aria-label={`Theme: ${theme} (click to switch)`}
                >
            </Button>
        </Tooltip>
    );
};

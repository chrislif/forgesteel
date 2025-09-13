import { useMemo } from "react";
import { Button, Tooltip } from "antd";
import { useThemeMode } from "../../main/theme-provider";
import { LaptopOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";

type ThemeMode = "system" | "light" | "dark";

function nextMode(mode: ThemeMode): ThemeMode {
    switch(mode) {
        case 'system':
            return 'light';
        case 'light':
            return 'dark';
        default:
            return 'system';
    }
}

export const ThemeToggle = () => {
    const { mode, setMode } = useThemeMode();

    const icon = useMemo(() => {
        switch (mode) {
            case "light":
                return <SunOutlined />;
            case "dark":
                return <MoonOutlined />;
            default:
                return <LaptopOutlined />;
        }
    }, [mode]);

    const handleClick = () => setMode(nextMode(mode));

    return (
        <Tooltip title={`Theme: ${mode} (click to switch)`}>
            <Button
                type="text"
                onClick={handleClick}
                icon={icon}
                aria-label={`Theme: ${mode} (click to switch)`}
                >
            </Button>
        </Tooltip>
    );
};
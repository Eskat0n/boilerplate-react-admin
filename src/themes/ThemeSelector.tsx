import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PaletteType, Theme, ThemeProvider } from "@material-ui/core";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

type ThemeKind = PaletteType;

interface IThemeSelectorContext {
    theme: ThemeKind;
    syncWithOS: boolean;
    setTheme: (value: ThemeKind) => void;
    setSyncWithOS: (value: boolean) => void;
}

const ThemeSelectorContext = createContext<IThemeSelectorContext>({
    theme: "light",
    syncWithOS: false,
    setTheme: () => null,
    setSyncWithOS: () => null
});

const themeRegistry: Record<ThemeKind, Theme> = {
    light: lightTheme,
    dark: darkTheme
};

export type ThemeSelectorProps = React.PropsWithChildren<{
    defaultTheme: ThemeKind;
}>;

export const ThemeSelector = (props: ThemeSelectorProps) => {
    const [theme, setTheme] = useState(props.defaultTheme);
    const [syncWithOS, setSyncWithOS] = useState(false);
    const darkModeChangeListener = useCallback((event: MediaQueryListEvent) => {
        setTheme(event.matches ? "dark" : "light");
    }, []);
    const context = {
        theme,
        syncWithOS,
        setTheme,
        setSyncWithOS
    };

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", darkModeChangeListener);

        return () => {
            window.matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", darkModeChangeListener);
        };
    }, []);

    useEffect(() => {
        if (syncWithOS) {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }
    }, [syncWithOS]);

    return (
        <ThemeSelectorContext.Provider value={context}>
            <ThemeProvider theme={themeRegistry[theme]}>
                {props.children}
            </ThemeProvider>
        </ThemeSelectorContext.Provider>
    );
};

export const useThemeSelector = () => useContext(ThemeSelectorContext);

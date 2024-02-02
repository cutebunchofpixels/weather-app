import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        blue: Palette["primary"];
        gray: Palette["primary"];
        orange: Palette["primary"];
    }

    interface PaletteOptions {
        blue?: PaletteOptions["primary"];
        gray?: PaletteOptions["primary"];
        orange?: PaletteOptions["primary"];
    }
}

export const defaultTheme = createTheme({
    palette: {
        blue: {
            main: "#459DE9",
            light: "#F1F2FF",
        },
        gray: {
            main: "#C5C5C5",
            light: "#F2F2F2",
            dark: "#8D8D8D",
        },
        orange: {
            main: "#FFFAF1",
        },
    },
    typography: {
        fontFamily: "Jost, sans-serif",
    },
});


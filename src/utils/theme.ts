import { createTheme } from "@mui/material";
import { Shadows } from "@mui/material";

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

const originalTheme = createTheme({});

export const defaultTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: (themeParam) => `
        body {
          color: #000;
        }
      `,
        },
    },
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
            main: "#FFA25B",
            light: "#FFFAF1",
        },
    },
    typography: {
        fontFamily: "Jost, sans-serif",
    },
    shadows: originalTheme.shadows.map((shadow, index) => {
        if (index === 1) {
            return "#00000029 0 3px 6px";
        }

        return shadow;
    }) as Shadows,
});


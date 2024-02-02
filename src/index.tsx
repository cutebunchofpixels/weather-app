import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./utils/theme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);


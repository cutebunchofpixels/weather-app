import { Suspense, useMemo } from "react";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Home from "./components/pages/home/Home";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { defaultTheme } from "./utils/theme";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/app/store";
import { PersistGate } from "redux-persist/integration/react";
import FullScreenLoader from "./components/ui/loader/FullScreenLoader";

const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
    key: "muiltr",
});

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        document.dir = i18n.dir() || "ltr";
    });

    const theme = useMemo(() => {
        const theme = { ...defaultTheme, direction: i18n.dir() };
        return theme;
    }, [i18n]);

    return (
        <CacheProvider value={i18n.dir() === "ltr" ? ltrCache : rtlCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Suspense fallback={<FullScreenLoader />}>
                    <PersistGate
                        loading={<FullScreenLoader />}
                        persistor={persistor}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                minHeight: "100vh",
                                padding: "25px",
                            }}
                        >
                            <Provider store={store}>
                                <Home />
                            </Provider>
                        </Box>
                    </PersistGate>
                </Suspense>
            </ThemeProvider>
        </CacheProvider>
    );
}
export default App;


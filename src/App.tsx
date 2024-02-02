import { Suspense } from "react";
import { Box } from "@mui/material";
import Home from "./components/pages/home/Home";

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box sx={{ display: "flex", minHeight: "100vh", padding: "2rem" }}>
                <Home />
            </Box>
        </Suspense>
    );
}

export default App;


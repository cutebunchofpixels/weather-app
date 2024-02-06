import { Box, CircularProgress } from "@mui/material";

export default function FullScreenLoader() {
    return (
        <Box
            sx={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                position: "fixed",
                inset: "0",
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress size="80px" sx={{ color: "#FFF" }} />
        </Box>
    );
}


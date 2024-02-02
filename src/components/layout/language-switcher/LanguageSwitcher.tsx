import { InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import { languages } from "./languages";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
    color: theme.palette.gray.main,
}));

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <Select
            value={i18n.resolvedLanguage}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            IconComponent={StyledExpandMoreIcon}
            startAdornment={
                <InputAdornment position="start">
                    <LanguageIcon />
                </InputAdornment>
            }
            sx={{
                "& fieldset": { border: "none" },
                "& .MuiSvgIcon-root": { color: "gray.main" },
                minWidth: "3.62rem",
                padding: 0,
                color: "gray.main",
            }}
            MenuProps={{
                MenuListProps: {
                    sx: {
                        padding: 0,
                    },
                },
                slotProps: {
                    paper: {
                        sx: {
                            boxShadow: "#00000029 0 3px 6px",
                        },
                    },
                },
            }}
        >
            {languages.map((language) => (
                <MenuItem
                    value={language}
                    key={language}
                    disabled={i18n.resolvedLanguage === language}
                    sx={{ px: "3px", py: "5px" }}
                >
                    <Typography sx={{ textTransform: "uppercase" }}>
                        {language}
                    </Typography>
                </MenuItem>
            ))}
        </Select>
    );
}


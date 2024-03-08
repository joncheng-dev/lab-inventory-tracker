import { styled as styledMui } from "@mui/material/styles";
import { IconButton, Paper } from "@mui/material";

export const FixedWidthItem = styledMui(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const StyledIconButton = styledMui(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#fff" : "#1A2027",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#777777" : "#fff",
    backgroundColor: "transparent",
  },
  "&:focus, &:active": {
    color: theme.palette.mode === "dark" ? "#777777" : "#fff",
    backgroundColor: "transparent",
    outline: "none", // Remove the outline
  },
}));

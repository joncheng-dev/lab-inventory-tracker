import { styled as styledMui } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const FixedWidthItem = styledMui(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

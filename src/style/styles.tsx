import { styled as styledMui } from "@mui/material/styles";
import { IconButton, Paper } from "@mui/material";

export const CategoryColumn = styledMui(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginLeft: theme.spacing(2),
  // prettier-ignore
  [theme.breakpoints.up("sm")]: { // 600 px
    paddingLeft: theme.spacing(2),
  },
  // prettier-ignore
  [theme.breakpoints.up("md")]: { // 900 px
    paddingLeft: theme.spacing(2),
  },
  // prettier-ignore
  [theme.breakpoints.up("lg")]: { // 1200 px
    paddingLeft: theme.spacing(2),
  },
  // prettier-ignore
  [theme.breakpoints.up("xl")]: { // 1536 px
    paddingLeft: theme.spacing(2),
  },
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const UserInfoColumn = styledMui(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginRight: theme.spacing(2),
  // // prettier-ignore
  // [theme.breakpoints.up("sm")]: { // 600 px
  //   paddingLeft: theme.spacing(2),
  // },
  // // prettier-ignore
  // [theme.breakpoints.up("md")]: { // 900 px
  //   paddingLeft: theme.spacing(2),
  // },
  // // prettier-ignore
  // [theme.breakpoints.up("lg")]: { // 1200 px
  //   paddingLeft: theme.spacing(3),
  // },
  // // prettier-ignore
  // [theme.breakpoints.up("xl")]: { // 1536 px
  //   paddingLeft: theme.spacing(4),
  // },
  color: theme.palette.text.secondary,
}));

export const StyledIconButton = styledMui(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#fff" : "#1A2027",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#777777" : "#7E786B",
    backgroundColor: "transparent",
  },
  "&:focus, &:active": {
    color: theme.palette.mode === "dark" ? "#777777" : "#7E786B",
    backgroundColor: "transparent",
    outline: "none", // Remove the outline
  },
}));

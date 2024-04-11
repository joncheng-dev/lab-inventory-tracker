import { useState, useContext } from "react";
import { Item, ItemType } from "../types";
import { AppBar, Box, Chip, Grid, IconButton, InputBase, Stack, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../themes.tsx";
import { styled, alpha } from "@mui/material/styles";
import { DarkModeOutlined, LightModeOutlined, MoreVert, Search } from "@mui/icons-material/";
import { doSignOut } from "../hooks/authUtil.tsx";
import { useNavigate } from "react-router-dom";
import { sharedInfo } from "../helpers/UserContext";
import LeftNav from "./LeftNav.tsx";
import { StyledIconButton } from "../style/styles.tsx";
import RightNav from "./RightNav.tsx";

interface HeaderProps {
  onSearchInputChange: (queryString: string) => void;
  // For CategoryPanel
  tagsToFilter: string[];
  onFilterByCategory: (arrayOfTags: string[]) => void;
  // For UserInfoPanel
  listOfItemTypes: ItemType[];
  itemsCheckedOutByUser: Item[];
  onEntryClick: (id: string) => void;
}

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledStackContainer = styled("div")(({ theme }) => ({
  gridArea: "rest",
  display: "flex",
  justifyContent: "flex-end",
}));

const StyledAppBarContainer = styled("div")(({ theme }) => ({
  width: "100vw",
  display: "grid",
  gridTemplateColumns: "40px 1fr auto",
  gridTemplateAreas: `"leftNav search rest"`,
}));

export default function Header(props: HeaderProps) {
  const theme = useTheme();
  const { tagsToFilter, onFilterByCategory, listOfItemTypes, itemsCheckedOutByUser, onEntryClick } = props;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const userProvider = sharedInfo();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { onSearchInputChange } = props;
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleSearchBarChange(e: { target: { value: string } }) {
    onSearchInputChange(e.target.value.toString());
  }

  async function handleSignOut() {
    try {
      userProvider?.signOutUser();
      navigate("/signin");
    } catch (error: any) {
      console.error("Error during sign-out:", error.message);
    }
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.mode === "dark" ? "#141b2d" : "#fff",
        boxShadow: "none",
        // paddingLeft: "2em",
      }}
    >
      <Toolbar>
        <StyledAppBarContainer>
          <LeftNav tagsToFilter={tagsToFilter} onFilterByCategory={onFilterByCategory} />
          <Box
            sx={{
              gridArea: "search",
              // display: "flex",
              // alignItems: "left",
              position: "relative",
              borderRadius: theme.shape.borderRadius,
              backgroundColor: colors.primary[400],
              // backgroundColor: alpha(theme.palette.common.white, 0.15),
              // "&:hover": {
              //   backgroundColor: alpha(theme.palette.common.white, 0.25),
              // },
              marginRight: theme.spacing(2),
              marginLeft: 0,
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search" inputProps={{ "aria-label": "search" }} onChange={handleSearchBarChange} />
          </Box>
          <StyledStackContainer>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
              </IconButton>
              {/* <Chip label="Home" component="a" href="/lab-inventory-tracker/inventory" variant="outlined" clickable /> */}
              <Chip label="Sign Out" onClick={handleSignOut} variant="outlined" clickable />
              {isMediumScreen && (
                // RightNav here
                <RightNav
                  // prettier-ignore
                  listOfItemTypes={listOfItemTypes}
                  itemsCheckedOutByUser={itemsCheckedOutByUser}
                  onEntryClick={onEntryClick}
                />
              )}
            </Stack>
          </StyledStackContainer>
        </StyledAppBarContainer>
      </Toolbar>
    </AppBar>
  );
}

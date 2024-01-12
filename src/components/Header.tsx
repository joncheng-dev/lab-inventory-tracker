import { useState, useContext } from "react";
import { auth } from "../firebase.tsx";
import { signOut } from "firebase/auth";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../themes.tsx";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";

type HeaderProps = {
  onSearchInputChange: (queryString: string) => void;
};

export default function Header(props: HeaderProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { onSearchInputChange } = props;
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);

  function handleSearchBarChange(e: { target: { value: string } }) {
    onSearchInputChange(e.target.value.toString());
    console.log("Search query sent to parent: ", e.target.value.toString());
  }

  function doSignOut() {
    signOut(auth)
      .then(() => {
        setSignOutSuccess("You've signed out.");
      })
      .catch((error) => {
        setSignOutSuccess(`There was an error with sign-out: ${error.message}`);
      });
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" sx={{ backgroundColor: colors.primary[400], borderRadius: "3px" }} component="form" noValidate autoComplete="off">
          <InputBase sx={{ ml: 2, flex: 1 }} name="searchString" onChange={handleSearchBarChange} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <Stack direction="row" spacing={1}>
            <Chip label="Home" component="a" href="/" variant="outlined" clickable />
            <Chip label="Sign Out" onClick={doSignOut} component="a" href="/signin" variant="outlined" clickable />
          </Stack>
        </Box>
      </Box>
      <hr />
    </>
  );
}

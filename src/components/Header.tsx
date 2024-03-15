import { useState, useContext } from "react";
import { auth } from "../firebase.tsx";
import { Box, Chip, IconButton, InputBase, Stack, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../themes.tsx";
import { DarkModeOutlined, LightModeOutlined, Search } from "@mui/icons-material/";
import { doSignOut } from "../hooks/authUtil.tsx";
import { useNavigate } from "react-router-dom";
import { sharedInfo } from "../helpers/UserContext";

type HeaderProps = {
  onSearchInputChange: (queryString: string) => void;
};

export default function Header(props: HeaderProps) {
  const theme = useTheme();
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
      await doSignOut();
      console.log("Sign-out successful");
      navigate("/signin");
    } catch (error: any) {
      console.error("Error during sign-out:", error.message);
    }
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" pt={2} pr={2} pb={2}>
        <Box
          display="flex"
          sx={{ backgroundColor: colors.primary[400], borderRadius: "3px" }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            // prettier-ignore
            const searchString = (e.target as HTMLFormElement).elements.namedItem(
              "searchString"
            ) as HTMLInputElement;
            onSearchInputChange(searchString?.value || "");
          }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} name="searchString" onChange={handleSearchBarChange} placeholder="Search" />
          <IconButton type="submit" sx={{ p: 1 }}>
            <Search />
          </IconButton>
        </Box>
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>{theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}</IconButton>
          <Stack direction="row" spacing={1}>
            <Chip label="Home" component="a" href="/lab-inventory-tracker/inventory" variant="outlined" clickable />
            <Chip label="Sign Out" onClick={handleSignOut} variant="outlined" clickable />
          </Stack>
        </Box>
      </Box>
      <hr />
    </>
  );
}

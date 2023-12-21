import { useState } from "react";
import { auth } from "../firebase.tsx";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const StyledHeader = styled.header`
  width: 100%;
  max-width: 100vw;
`;

function Header() {
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);

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
    <StyledHeader>
      <Box display="flex" justifyContent="space-between" p={1}>
        <Box display="flex" borderRadius="3px">
          <h1>Lab Inventory Management</h1>
        </Box>
        <Box display="flex" borderRadius="3px" p={2}>
          <Stack direction="row" spacing={1}>
            <Chip label="Home" component="a" href="/" variant="outlined" clickable />
            <Chip label="Sign Out" onClick={doSignOut} component="a" href="/signin" variant="outlined" clickable />
          </Stack>
        </Box>
      </Box>
      <hr />
    </StyledHeader>
  );
}

export default Header;

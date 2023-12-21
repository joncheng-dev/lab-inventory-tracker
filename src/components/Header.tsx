import { useState } from "react";
import { auth } from "../firebase.tsx";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
      <div>
        <h1>Lab Inventory Management</h1>
        <Stack direction="row" spacing={1}>
          <Chip label="Home" component="a" href="/" variant="outlined" clickable />
          <Chip label="Sign Out" onClick={doSignOut} component="a" href="/signin" variant="outlined" clickable />
        </Stack>
      </div>
      <hr />
    </StyledHeader>
  );
}

export default Header;

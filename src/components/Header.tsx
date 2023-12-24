import { useState, FormEvent } from "react";
import { auth } from "../firebase.tsx";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const StyledHeader = styled.header`
  width: 100%;
  max-width: 100vw;
`;

type HeaderProps = {
  onSearchInputChange: (queryString: string) => void;
};

// interface CustomElements extends HTMLFormControlsCollection {
//   searchString: HTMLInputElement;
// }

// interface CustomForm extends HTMLFormElement {
//   readonly elements: CustomElements;
// }

function Header(props: HeaderProps) {
  const { onSearchInputChange } = props;
  const [signOutSuccess, setSignOutSuccess] = useState<string | null>(null);
  // function handleSearchBarChange(e: FormEvent<CustomForm>) {
  //   e.preventDefault();
  //   const target = e.currentTarget.elements;
  //   const searchQuery = target.searchString.value.toString();
  //   console.log("Search query sent to parent: ", searchQuery);
  //   onSearchInputChange(searchQuery);
  // }
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
    <StyledHeader>
      <Box display="flex" justifyContent="space-between" p={1}>
        <Box display="flex" borderRadius="3px">
          <h1>Lab Manager</h1>
        </Box>
        <Box display="flex" component="form" noValidate autoComplete="off">
          <TextField name="searchString" sx={{ ml: 2, flex: 1 }} onChange={handleSearchBarChange} />
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" /> */}
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
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

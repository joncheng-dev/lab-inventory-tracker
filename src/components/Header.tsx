import styled from "styled-components";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const StyledHeader = styled.header`
  width: 100%;
`;

function Header() {
  return (
    <StyledHeader>
      <div>
        <h1>Inventory Tracker</h1>
        <Stack direction="row" spacing={1}>
          <Chip label="Home" component="a" href="/" variant="outlined" clickable />
          <Chip label="Sign In" component="a" href="/signin" variant="outlined" clickable />
        </Stack>
      </div>
      <hr />
    </StyledHeader>
  );
}

export default Header;

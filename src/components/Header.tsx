import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
`;

function Header() {
  return (
    <StyledHeader>
      <div>
        <h1>Inventory Tracker</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
      <hr />
    </StyledHeader>
  );
}

export default Header;

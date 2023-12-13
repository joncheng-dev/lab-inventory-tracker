import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
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
    </header>
  );
}

export default Header;

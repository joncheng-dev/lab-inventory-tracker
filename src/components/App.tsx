import SignIn from "../views/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ManageUsers from "../views/ManageUsers";
import InventoryControl from "../views/InventoryControl";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />}>
            <Route path="inventory" element={<InventoryControl />} />
            <Route path="manageusers" element={<ManageUsers />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

import SignIn from "../views/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ManageUsers from "../views/ManageUsers";
import ItemTypeControl from "../views/ItemTypeControl";
import InventoryControl from "../views/InventoryControl";
import { ColorModeContext, useMode } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import PrivateRoutes from "../helpers/PrivateRoutes";
// import { Theme } from "@mui/system";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename="/lab-inventory-tracker">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />}>
              <Route path="catalog" element={<ItemTypeControl />} />
              <Route path="inventory" element={<InventoryControl />} />
              <Route path="manageusers" element={<ManageUsers />} />
              {/* </Route> */}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

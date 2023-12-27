import SignIn from "../views/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ManageUsers from "../views/ManageUsers";
import InventoryControl from "../views/InventoryControl";
import { ColorModeContext, useMode } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/system";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />}>
              <Route path="inventory" element={<InventoryControl />} />
              <Route path="manageusers" element={<ManageUsers />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import SignIn from "../views/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ManageUsers from "../views/ManageUsers";
import ItemTypeControl from "../views/ItemTypeControl";
import { ColorModeContext, useMode } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/system";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />}>
              <Route path="inventory" element={<ItemTypeControl />} />
              <Route path="manageusers" element={<ManageUsers />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

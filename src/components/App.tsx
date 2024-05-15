import SignIn from "../views/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ManageUsers from "../views/ManageUsers";
import ItemTypeControl from "../views/ItemTypeControl";
import InventoryControl from "../views/InventoryControl";
import { ColorModeContext, useMode } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App() {
  const [theme, colorMode] = useMode();
  console.log("testing gh env var import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY: ", import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY);
  return (
    <div>
      <h4>test</h4>
    </div>
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <Router>
    //       <Routes>
    //         <Route path="/signin" element={<SignIn />} />
    //         <Route path="/" element={<Home />}>
    //           <Route path="catalog" element={<ItemTypeControl />} />
    //           <Route path="inventory" element={<InventoryControl />} />
    //           <Route path="manageusers" element={<ManageUsers />} />
    //         </Route>
    //       </Routes>
    //     </Router>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

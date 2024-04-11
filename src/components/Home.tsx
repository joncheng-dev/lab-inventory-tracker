import { useContext, useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
// Firebase / Firestore
import { sharedInfo } from "../helpers/UserContext";
// Components & Style
import Layout from "./Layout.js";
import { Grid } from "@mui/material/";
import Sidebar from "../components/SideBar";

// type ContextType = { currentUser: useLocalStorageProps | null };
interface UserInfo {
  email: string;
  isAdmin: boolean;
}

interface AuthContextValue {
  signIn: (email: string, password: string) => void;
  currentUser: UserInfo | null;
}

export default function Home() {
  const userProvider = sharedInfo();
  const navigate = useNavigate();
  const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  // const sidebarWidth = isSidebarExpanded ? 2 : 1;
  const sidebarWidth = isSidebarExpanded ? 1.25 : 1;
  const mainContentWidth = isSidebarExpanded ? 10.75 : 11;

  useEffect(() => {
    console.log("user: ", userProvider);
  }, [userProvider]);

  const handleSidebarToggle = () => {
    setSidebarExpanded((prev) => !prev);
  };

  return (
    <Layout>
      <>{userProvider?.currentUser ? <Outlet /> : <Navigate to="/signin" />}</>
    </Layout>
  );
}

// return (
//   <Layout>
//     <>
//       {userProvider?.currentUser ? (
//         <Grid container spacing={1}>
//           {/* <Grid item xs={sidebarWidth} style={{ transition: "all 0.5s" }}> */}
//           {/* <Grid item sx={{ display: { xs: "none", sm: "inline-block", md: "inline-block" } }} style={{ transition: "all 0.5s" }}>
//             <Sidebar onToggle={handleSidebarToggle} />
//           </Grid> */}
//           <Grid item>
//             {/* <Grid item xs={mainContentWidth} sm={mainContentWidth} style={{ transition: "all 0.5s" }}> */}
//             {/* <Grid item xs={mainContentWidth} style={{ transition: "all 0.5s" }}> */}
//             <Outlet />
//           </Grid>
//         </Grid>
//       ) : (
//         <Navigate to="/signin" />
//       )}
//     </>
//   </Layout>
// );

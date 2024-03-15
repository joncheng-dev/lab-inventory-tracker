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
  console.log("Home, userProvider.currentUser via useContext: ", userProvider?.currentUser);
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
      <>
        {userProvider?.currentUser ? (
          <Grid container spacing={1}>
            <Grid item xs={sidebarWidth} style={{ transition: "all 0.5s" }}>
              <Sidebar onToggle={handleSidebarToggle} />
            </Grid>
            <Grid item xs={mainContentWidth} style={{ transition: "all 0.5s" }}>
              <Outlet />
            </Grid>
          </Grid>
        ) : (
          <Navigate to="/signin" />
        )}
      </>
    </Layout>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate, Outlet } from "react-router-dom";
// // Firebase / Firestore
// import { auth } from "../firebase.js";
// import { useAuthState } from "react-firebase-hooks/auth";
// // Components & Style
// import Layout from "./Layout.js";
// import { Grid } from "@mui/material/";
// import Sidebar from "../components/SideBar";

// // type ContextType = { currentUser: useLocalStorageProps | null };

// export default function Home() {
//   const [user, loading] = useAuthState(auth);
//   const [isReady, setReady] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
//   // const sidebarWidth = isSidebarExpanded ? 2 : 1;
//   const sidebarWidth = isSidebarExpanded ? 1.25 : 1;
//   const mainContentWidth = isSidebarExpanded ? 10.75 : 11;

//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         navigate("/signin");
//       } else {
//         setReady(true);
//       }
//     }
//   }, [user, loading, navigate]);

//   if (!isReady) {
//     return null;
//   }

//   const handleSidebarToggle = () => {
//     setSidebarExpanded((prev) => !prev);
//   };

//   return (
//     <Layout>
//       <>
//         <Grid container spacing={1}>
//           <Grid item xs={sidebarWidth} style={{ transition: "all 0.5s" }}>
//             <Sidebar onToggle={handleSidebarToggle} />
//           </Grid>
//           <Grid item xs={mainContentWidth} style={{ transition: "all 0.5s" }}>
//             <Outlet />
//           </Grid>
//         </Grid>
//       </>
//     </Layout>
//   );
// }

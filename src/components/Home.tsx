import { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet, useOutletContext } from "react-router-dom";
import useLocalStorage, { useLocalStorageProps } from "../hooks/useLocalStorage.js";
import { UserContext } from "../helpers/UserContext.js";
// Firebase / Firestore
import { db, auth } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
// Components & Style
import Layout from "./Layout.js";
import Grid from "@mui/material/Grid";
import Sidebar from "../components/SideBar";
// Types
import { UserEntry } from "../types/index.js";

// type ContextType = { currentUser: useLocalStorageProps | null };

export default function Home() {
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState<UserEntry | null>(null);
  // const [currentUser, setCurrentUser] = useState<useLocalStorageProps | null>(null);
  const currentUser = useContext(UserContext);
  const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const sidebarWidth = isSidebarExpanded ? 2 : 1;
  const mainContentWidth = isSidebarExpanded ? 10 : 11;

  // const localUser = useLocalStorage({ key: "currentUser", objectToStore: currentUser });

  // useEffect(() => {
  //   // Check if the user is authenticated. If logged in, to inventory. If not, to sign in
  //   const checkAuth = async () => {
  //     try {
  //       if (auth.currentUser) {
  //         const userRef = doc(db, "users", auth.currentUser.uid);
  //         const docSnap = await getDoc(userRef);
  //         if (docSnap.exists()) {
  //           const userInfo = docSnap.data() as UserEntry;
  //           setCurrentUser({ key: "currentUser", objectToStore: userInfo });
  //           navigate("/inventory");
  //         } else {
  //           console.log("No such user in database. (User collections does not contain a user document with this id.)");
  //         }
  //       } else if (localStorage !== null) {
  //         navigate("/inventory");
  //       } else {
  //         navigate("/signin");
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving user info:", error);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  useEffect(() => {
    if (currentUser) {
      navigate("/inventory");
    } else {
      navigate("/signin");
    }
  }, []);

  // useEffect(() => {
  //   console.log("localUser: ", localUser);
  // }, [currentUser]);

  // useEffect(() => {
  //   if (localUser !== null) {
  //     setCurrentUser(localUser);
  //   }
  // }, [localUser]);

  const handleSidebarToggle = () => {
    setSidebarExpanded((prev) => !prev);
  };

  return (
    <Layout>
      <>
        <Grid container spacing={1}>
          <Grid item xs={sidebarWidth} style={{ transition: "all 0.5s" }}>
            <Sidebar onToggle={handleSidebarToggle} />
          </Grid>
          <Grid item xs={mainContentWidth} style={{ transition: "all 0.5s" }}>
            {/* Conditional rendering */}
            {/* <Outlet context={{ currentUser } satisfies ContextType} /> */}
            <Outlet />
          </Grid>
        </Grid>
      </>
    </Layout>
  );
}

// export default Home;

// export function useUser() {
//   return useOutletContext<ContextType>();
// }

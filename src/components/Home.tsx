import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
// Firebase / Firestore
import { db, auth } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
// Components & Style
import Layout from "./Layout.js";
import Grid from "@mui/material/Grid";
import Sidebar from "../components/SideBar";
// Types
import { UserEntry } from "../types/index.js";

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserEntry | null>(null);
  const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const sidebarWidth = isSidebarExpanded ? 2 : 1;
  const mainContentWidth = isSidebarExpanded ? 10 : 11;

  useEffect(() => {
    handleGettingCurrentUserInfoFromDb();
  }, []);

  const handleGettingCurrentUserInfoFromDb = async () => {
    try {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userInfo = docSnap.data() as UserEntry;
          setCurrentUser(userInfo);
          // Redirect user to sign-in if not signed in.
        } else {
          console.log("No such user in database. (User collections does not contain a user document with this id.)");
        }
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error retrieving user info:", error);
    }
  };

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
            <Outlet />
          </Grid>
        </Grid>
      </>
    </Layout>
  );
}

export default Home;

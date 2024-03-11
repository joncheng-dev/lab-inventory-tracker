import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
// Firebase / Firestore
import { auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
// Components & Style
import Layout from "./Layout.js";
import { Grid } from "@mui/material/";
import Sidebar from "../components/SideBar";

// type ContextType = { currentUser: useLocalStorageProps | null };

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [isReady, setReady] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  // const sidebarWidth = isSidebarExpanded ? 2 : 1;
  const sidebarWidth = isSidebarExpanded ? 1.25 : 1;
  const mainContentWidth = isSidebarExpanded ? 10.75 : 11;

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/signin");
      } else {
        setReady(true);
      }
    }
  }, [user, loading, navigate]);

  if (!isReady) {
    return null;
  }

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
            <Outlet />
          </Grid>
        </Grid>
      </>
    </Layout>
  );
}

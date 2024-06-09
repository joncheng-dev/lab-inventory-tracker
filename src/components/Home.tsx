import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
// Firebase / Firestore
import { sharedInfo } from "../helpers/UserContext";
// Components & Style
import Layout from "./Layout.js";

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

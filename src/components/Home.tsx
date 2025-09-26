import { Navigate, Outlet } from "react-router-dom";
// Firebase / Firestore
import { sharedInfo } from "../helpers/UserContext";
// Components & Style
import Layout from "./Layout.js";

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

  return (
    <Layout>
      <>{userProvider?.currentUser ? <Outlet /> : <Navigate to="/signin" />}</>
    </Layout>
  );
}

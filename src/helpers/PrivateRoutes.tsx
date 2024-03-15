import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const PrivateRoutes = () => {
  const user = useContext(UserContext);

  return (
    // prettier-ignore
    user ? <Outlet/> : <Navigate to="/signin" />
  );
};

export default PrivateRoutes;

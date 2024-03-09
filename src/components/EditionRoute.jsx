import { useAuth } from "../context/AuthProvider";


import { Navigate, Outlet, useLocation } from "react-router-dom";

const EditionRoute = () => {

  const {auth, user } = useAuth();
  
  return (
    <Outlet />
    )
};

export default EditionRoute;
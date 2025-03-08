import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const UnprotectedRoute = () => {
    const {isAuthenticated} = useAuth();
    return !isAuthenticated ? <Outlet/> : <Navigate to="/" />

};

export default UnprotectedRoute;
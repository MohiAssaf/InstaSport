import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuthorization";

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <Outlet/>:<Navigate to="/login" />
};

export default ProtectedRoute;
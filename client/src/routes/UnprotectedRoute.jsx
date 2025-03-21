import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuthorization";

const UnprotectedRoute = () => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <Navigate to="/" />: <Outlet/> 

};

export default UnprotectedRoute;
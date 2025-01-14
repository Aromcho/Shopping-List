import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { user, isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />

  return (
    <Outlet />
  );
}

export default ProtectedRoutes;
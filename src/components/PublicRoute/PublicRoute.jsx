import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? (
    <Navigate
      to={location.state?.from || "/"}
      replace
      state={{ from: location }}
    />
  ) : (
    children
  );
}

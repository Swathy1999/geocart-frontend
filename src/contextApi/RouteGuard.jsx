import { Navigate } from "react-router-dom";
import { useShare } from "./ShareContext";
export default function RouteGuard({ children, roles }) {
  const { user } = useShare();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

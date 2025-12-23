import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  // While Firebase is checking auth
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return children;
}

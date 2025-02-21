import { useAuth } from "@clerk/clerk-react";
import { Link, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return (
      <Link to={`/auth?redirectTo=${encodeURIComponent(location.pathname)}`}>
        Sign-In to continue
      </Link>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

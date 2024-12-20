import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Ensure correct import
import api from "../Api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import { useAuth } from "./admin/AuthProvider";
import LoadingIndicator from "./boxes/Loader";

function ProtectedRoute({ children, allowedRoles }) {
  const [isAuthorized, setIsAuthorized] = useState(null); // Loading state
  const navigate = useNavigate();
  const { user } = useAuth(); // Fetch current user

  // Refresh the token if expired
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthorized(false);
    }
  };

  // Verify the current access token
  const authenticate = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setIsAuthorized(false);
    }
  };

  // Initial authentication on mount
  useEffect(() => {
    authenticate();
  }, []);

  // Navigation logic after authorization is determined
  useEffect(() => {
    if (isAuthorized === null || !user) return; // Wait for authorization status

    if (isAuthorized) {
      if (allowedRoles.includes("admin") && user.isAdmin) {
        // Admin access
        console.log("Navigating to Admin page");
      } else if (allowedRoles.includes("tenant") && !user.isAdmin) {
        // Tenant access
        console.log("Navigating to Tenant page");
      } else {
        // Unauthorized access
        console.warn("Unauthorized access to the protected route.");
        navigate("/unauthorized", { replace: true });
      }
    } else if (!user) {
        // Redirect to login
        navigate("/login", { replace: true });
    }else {
      // Redirect to login
      navigate("/login", { replace: true });
    }
  }, [isAuthorized, user, allowedRoles, navigate]);

  // Display a loading indicator while authorization is being determined
  if (isAuthorized === null) {
    return <div className="loading-page">
              Authenticating...
              <LoadingIndicator />
            </div>;
  }

  // Render children if authorized
  if (isAuthorized && user) {
    if ((allowedRoles.includes("admin") && user.isAdmin) || 
        (allowedRoles.includes("tenant") && !user.isAdmin)) {
      return children;
    }
  }

  // Prevent unauthorized content from rendering
  return null;
}

export default ProtectedRoute;

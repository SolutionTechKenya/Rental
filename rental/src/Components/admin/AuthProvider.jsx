import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tenants, setTenants] = useState(() => {
    const storedTenants = sessionStorage.getItem("tenants");
    return storedTenants ? JSON.parse(storedTenants) : [];
  });

  const [rooms, setRooms] = useState(() => {
    const storedRooms = sessionStorage.getItem("rooms");
    return storedRooms ? JSON.parse(storedRooms) : [];
  });

  const [buildings, setBuildings] = useState(() => {
    const storedBuildings = sessionStorage.getItem("buildings");
    return storedBuildings ? JSON.parse(storedBuildings) : {};
  });

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [isAuthorized, setAuthorized] = useState(() => {
    return !!sessionStorage.getItem("access");
  });

  const navigate = useNavigate();

  const [currentBuilding, setCurrentBuilding] = useState(() => {
    const storedBuildings = sessionStorage.getItem("currentBuilding");
    return storedBuildings ? JSON.parse(storedBuildings) : [];
  });

  const [activePage, setActivePage] = useState(() => {
    const storedItems = sessionStorage.getItem("activePage");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // Persist data to sessionStorage when state changes
  useEffect(() => {
    sessionStorage.setItem("tenants", JSON.stringify(tenants));
  }, [tenants]);

  useEffect(() => {
    sessionStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    sessionStorage.setItem("buildings", JSON.stringify(buildings));
  }, [buildings]);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem("currentBuilding", JSON.stringify(currentBuilding));
  }, [currentBuilding]);

  useEffect(() => {
    sessionStorage.setItem("activePage", JSON.stringify(activePage));
  }, [activePage]);

  const login = (refresh, access, userData) => {
    sessionStorage.setItem("access", access);
    sessionStorage.setItem("refresh", refresh);
    setAuthorized(true);
    setUser(userData); 
    navigate("/Admin");
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setAuthorized(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        user,
        setUser,
        login,
        logout,
        buildings,
        setBuildings,
        tenants,
        setTenants,
        rooms,
        setRooms,
        activePage,
        setActivePage,
        currentBuilding,
        setCurrentBuilding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

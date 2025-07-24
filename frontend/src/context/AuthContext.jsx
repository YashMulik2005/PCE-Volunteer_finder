import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(null);
  const [userdata, setuserdata] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUserdata = Cookies.get("user_data");

    if (savedToken) settoken(savedToken);
    if (savedUserdata) {
      try {
        setuserdata(JSON.parse(savedUserdata));
      } catch (err) {
        console.error("Invalid userdata in cookies:", err);
        setuserdata(null);
      }
    }
  }, []);

  const value = {
    token,
    settoken,
    userdata,
    setuserdata,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const authHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("authHook must be used within AuthProvider");
  }
  return context;
};

export default authHook;

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("register");

  const openAuthModal = (mode = "register") => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const closeAuthModal = () => {
    setShowAuth(false);
  };

  const value = {
    showAuth,
    authMode,
    openAuthModal,
    closeAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

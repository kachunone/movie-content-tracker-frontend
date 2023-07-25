"use client";

import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => void;
  login: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logout: () => {
          setIsLoggedIn(false);
        },
        login: () => {
          setIsLoggedIn(true);
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

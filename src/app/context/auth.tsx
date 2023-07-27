"use client";

import { createContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";

interface AuthContextType {
  isLoggedIn: boolean;
  loggedInUser: string;
  logout: () => void;
  login: () => void;
  setUsername: (username: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedInUser: "",
  logout: () => {},
  login: () => {},
  setUsername: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

async function validateToken(token: string) {
  const res = await fetch("http://localhost:3001/auth/validate-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const token = getCookie("token");
      if (token) {
        try {
          const result = await validateToken(token.toString());

          if (result.status === 200) {
            setIsLoggedIn(true);
            setLoggedInUser(result.username);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchToken();
  }, []);

  const setUsername = (name: string) => {
    setLoggedInUser(name);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loggedInUser: loggedInUser,
        logout: () => setIsLoggedIn(false),
        login: () => setIsLoggedIn(true),
        setUsername: setUsername,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

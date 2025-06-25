"use client"
import { fetchCurrentUser } from "@/services/users";
// context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    console.log('from user context');

    useEffect(() => {
        async function getUser() {
            await fetchCurrentUser();
        }   
    }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

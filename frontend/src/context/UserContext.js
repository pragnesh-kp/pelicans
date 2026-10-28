"use client";

import { createContext, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider({ user, children }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// The logged-in user, available in any admin client component
export const useUser = () => useContext(UserContext);

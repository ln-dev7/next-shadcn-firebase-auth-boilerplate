import { createContext, useContext, useEffect, useState } from "react";
import firebase_app from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user)
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

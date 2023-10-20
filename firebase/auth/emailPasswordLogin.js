import { useState } from "react";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const useEmailPasswordLogin = () => {
  const [errorEmailPasswordLogin, setErrorEmailPasswordLogin] = useState(null);
  const [isPendingEmailPasswordLogin, setIsPendingEmailPasswordLogin] =
    useState(false);

  const emailPasswordLogin = async (email, password) => {
    setErrorEmailPasswordLogin(null);
    setIsPendingEmailPasswordLogin(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        return;
      }
    } catch (error) {
      setErrorEmailPasswordLogin(error.code);
      await signOut(auth);
    } finally {
      setIsPendingEmailPasswordLogin(false);
    }
  };

  return {
    emailPasswordLogin,
    errorEmailPasswordLogin,
    isPendingEmailPasswordLogin,
  };
};

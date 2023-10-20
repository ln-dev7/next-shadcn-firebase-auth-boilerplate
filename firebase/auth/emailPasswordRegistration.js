import { useState } from "react";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const useEmailPasswordRegistration = () => {
  const [errorEmailPasswordRegistration, setErrorEmailPasswordRegistration] =
    useState(null);
  const [isPendingEmailPasswordRegistration, setIsPendingEmailRegistration] =
    useState(false);

  const emailPasswordRegistration = async (email, password) => {
    setErrorEmailPasswordRegistration(null);
    setIsPendingEmailRegistration(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        return;
      }
    } catch (error) {
      setErrorEmailPasswordRegistration(error.code);
      await signOut(auth);
    } finally {
      setIsPendingEmailRegistration(false);
    }
  };

  return {
    emailPasswordRegistration,
    errorEmailPasswordRegistration,
    isPendingEmailPasswordRegistration,
  };
};

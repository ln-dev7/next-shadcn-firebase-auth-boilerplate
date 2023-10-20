import { useState } from "react";
import { auth } from "@/firebase/config";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const useGithubLogin = () => {
  const [errorGithubLogin, setErrorGithubLogin] = useState(false);
  const [isPendingGithubLogin, setIsPendingGithubLogin] = useState(false);
  const provider = new GithubAuthProvider();

  const githubLogin = async () => {
    setErrorGithubLogin(null);
    setIsPendingGithubLogin(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        return;
      }
    } catch (error) {
      setErrorGithubLogin(error.code);
      await signOut(auth);
    } finally {
      setIsPendingGithubLogin(false);
    }
  };

  return { githubLogin, errorGithubLogin, isPendingGithubLogin };
};

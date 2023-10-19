import { useState } from "react"
import { auth } from "@/firebase/config"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import firebase_app from "../config"
export const useGoogleLogin = () => {
    const [error, setError] = useState(false)
    const [isPendingGoogleLogin, setIsPendingGoogleLogin] = useState(false)
    const provider = new GoogleAuthProvider()
  
    const googleLogin = async () => {
      setError(null)
      setIsPendingGoogleLogin(true)
  
      try {
        const res = await signInWithPopup(auth, provider)
        if (!res) {
          //throw new Error("Could not complete signup")
          return
        }
  
      } catch (error) {
        //console.log(error)
        setError(error.message)
        // Déconnecter l'utilisateur en cas d'erreur
        await signOut(auth)
      } finally {
        setIsPendingGoogleLogin(false)
      }
    }
  
    return { googleLogin, error, isPendingGoogleLogin }
  }
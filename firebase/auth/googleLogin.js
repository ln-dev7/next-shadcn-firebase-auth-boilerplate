import { useState } from "react"
import { auth } from "@/firebase/config"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

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
          return
        }
  
      } catch (error) {
        setError(error.message)
        await signOut(auth)
      } finally {
        setIsPendingGoogleLogin(false)
      }
    }
  
    return { googleLogin, error, isPendingGoogleLogin }
  }
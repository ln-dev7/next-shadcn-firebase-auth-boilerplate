import { useState } from "react";
import { auth } from "@/firebase/config";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

export const useMagicLinkLogin = () => {
  const [errorMagicLink, setErrorMagicLink] = useState(null);
  const [isPendingMagicLinkLogin, setIsPendingMagicLinkLogin] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);

  const magicLinkLogin = async (email) => {
    setErrorMagicLink(null);
    setIsPendingMagicLinkLogin(true);

    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/",
        //url: "https://next-shadcn-firebase-auth-boilerplate.vercel.app/",
        handleCodeInApp: true,
      };

      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", email);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });

      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt("Please provide your email for confirmation");
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
    } catch (errorMagicLink) {
      setErrorMagicLink(errorMagicLink.message);
    } finally {
      setIsPendingMagicLinkLogin(false);
    }
  };

  return {
    magicLinkLogin,
    errorMagicLink,
    isPendingMagicLinkLogin,
    isMagicLinkSent,
  };
};

// const magicLinkLogin = async (email) => {
//   setErrorMagicLink(null);
//   setIsPendingMagicLinkLogin(true);

//   try {
//     const actionCodeSettings = {
//       url: "http://localhost:3000/",
//       //url: "https://next-shadcn-firebase-auth-boilerplate.vercel.app/",
//       handleCodeInApp: true,
//     };

//     await sendSignInLinkToEmail(auth, email, actionCodeSettings);
//     setIsMagicLinkSent(true);
//     if (isSignInWithEmailLink(auth, window.location.href)) {
//       await signInWithEmailLink(auth, email, window.location.href);
//     }
//   } catch (errorMagicLink) {
//     setErrorMagicLink(errorMagicLink.message);
//   } finally {
//     setIsPendingMagicLinkLogin(false);
//   }
// };

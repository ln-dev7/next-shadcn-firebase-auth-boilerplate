"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuthContext } from "@/context/auth-context";
import { useGoogleLogin } from "@/firebase/auth/googleLogin";
import { useGithubLogin } from "@/firebase/auth/githubLogin";
import { useEmailPasswordLogin } from "@/firebase/auth/emailPasswordLogin";
import { useEmailPasswordRegistration } from "@/firebase/auth/emailPasswordRegistration";
import { useEmailVerification } from "@/firebase/auth/emailVerificationLink";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Wand2, Globe2, Loader2, Shell, Github } from "lucide-react";

const FormSchemaEmailPassword = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please enter a valid email.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export default function Home() {
  const { toast } = useToast();

  const { user } = useAuthContext();
  const { googleLogin, isPendingGoogleLogin } = useGoogleLogin();
  const { githubLogin, isPendingGithubLogin } = useGithubLogin();
  const {
    emailPasswordLogin,
    errorEmailPasswordLogin,
    isPendingEmailPasswordLogin,
  } = useEmailPasswordLogin();
  const {
    emailPasswordRegistration,
    errorEmailPasswordRegistration,
    isPendingEmailPasswordRegistration,
  } = useEmailPasswordRegistration();
  const {
    isEmailVerificationSent,
    isEmailVerificationPending,
    errorVerificationLink,
    sendEmailVerificationLink,
  } = useEmailVerification();

  const formEmailPassword = useForm<z.infer<typeof FormSchemaEmailPassword>>({
    resolver: zodResolver(FormSchemaEmailPassword),
  });

  async function onSubmitEmailPasswordLogin(
    data: z.infer<typeof FormSchemaEmailPassword>
  ) {
    await emailPasswordLogin(data.email, data.password);
  }
  async function onSubmitEmailPasswordRegistration(
    data: z.infer<typeof FormSchemaEmailPassword>
  ) {
    await emailPasswordRegistration(data.email, data.password);
  }

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerificationLink();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full md:w-2/3 lg:w-1/2">
        {user ? (
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-center text-xl font-bold">Connected !</h1>
            <p>
              Hey{" "}
              <b className="italic underline underline-offset-4">
                {user.email}
              </b>{" "}
              👋
            </p>
            {user.emailVerified ? (
              <p className="text-green-900 text-md font-semibold">
                Your email is verified.
              </p>
            ) : (
              <>
                <p className="text-red-600 text-md font-semibold">
                  Your email is not verified.
                </p>
                <Button
                  disabled={
                    isPendingGoogleLogin ||
                    isPendingEmailPasswordLogin ||
                    isPendingEmailPasswordRegistration ||
                    isEmailVerificationPending
                  }
                  onClick={handleSendVerificationEmail}
                >
                  {isEmailVerificationPending && (
                    <Shell className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send verification email
                </Button>
              </>
            )}
            {isEmailVerificationSent && (
              <p className="text-green-900 text-md font-semibold">
                The email was successfully sent, check your email box to confirm
              </p>
            )}
            {errorVerificationLink && (
              <p className="text-red-900 text-md font-semibold">
                {errorVerificationLink}
              </p>
            )}
          </div>
        ) : (
          <div className="w-full">
            <Button
              className="w-full"
              type="button"
              variant="secondary"
              onClick={googleLogin}
              disabled={
                isPendingGoogleLogin ||
                isPendingEmailPasswordLogin ||
                isPendingEmailPasswordRegistration ||
                isEmailVerificationPending
              }
            >
              {isPendingGoogleLogin ? (
                <Shell className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Globe2 className="mr-2 h-4 w-4" />
              )}
              Sign in with Google
            </Button>
            <span className="flex font-semibold items-center justify-center my-6">
              OR
            </span>
            <Button
              className="w-full"
              type="button"
              variant="outline"
              onClick={githubLogin}
              disabled={
                isPendingGoogleLogin ||
                isPendingEmailPasswordLogin ||
                isPendingEmailPasswordRegistration ||
                isEmailVerificationPending
              }
            >
              {isPendingGithubLogin ? (
                <Shell className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Github className="mr-2 h-4 w-4" />
              )}
              Sign in with GitHub
            </Button>
            <span className="flex font-semibold items-center justify-center my-6">
              OR
            </span>
            <Form {...formEmailPassword}>
              <form className="w-full space-y-6">
                <FormField
                  control={formEmailPassword.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="leonelngoya@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formEmailPassword.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex items-center gap-2">
                  <Button
                    className="w-full"
                    type="button"
                    disabled={
                      isPendingGoogleLogin ||
                      isPendingEmailPasswordLogin ||
                      isPendingEmailPasswordRegistration ||
                      isEmailVerificationPending
                    }
                    onClick={formEmailPassword.handleSubmit(
                      onSubmitEmailPasswordLogin
                    )}
                  >
                    {isPendingEmailPasswordLogin && (
                      <Shell className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Connexion
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    disabled={
                      isPendingGoogleLogin ||
                      isPendingEmailPasswordLogin ||
                      isPendingEmailPasswordRegistration ||
                      isEmailVerificationPending
                    }
                    onClick={formEmailPassword.handleSubmit(
                      onSubmitEmailPasswordRegistration
                    )}
                  >
                    {isPendingEmailPasswordRegistration && (
                      <Shell className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                  </Button>
                </div>
                {(errorEmailPasswordLogin ||
                  errorEmailPasswordRegistration) && (
                  <span className="text-red-500 text-center text-sm block mt-4 font-semibold">
                    {errorEmailPasswordLogin ===
                      "auth/invalid-login-credentials" &&
                      "Invalid email or password"}
                    <br />
                    {errorEmailPasswordRegistration ===
                      "auth/email-already-in-use" &&
                      "This user already exists "}
                  </span>
                )}
              </form>
            </Form>
          </div>
        )}
      </div>
      <a
        href="https://github.com/ln-dev7/next-shadcn-firebase-auth-boilerplate"
        className={`absolute bottom-4 right-4 ${buttonVariants({
          size: "lg",
          variant: "destructive",
        })}`}
      >
        <Github className="w-5 h-5 mr-2" />
        Use This Boilerplate
      </a>
    </main>
  );
}

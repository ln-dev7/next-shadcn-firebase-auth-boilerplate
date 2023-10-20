"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuthContext } from "@/context/auth-context";
import { useGoogleLogin } from "@/firebase/auth/googleLogin";
import { useMagicLinkLogin } from "@/firebase/auth/magicLinkLogin";

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

const FormSchemaMagicLink = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please enter a valid email.",
    }),
});

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
  const {
    magicLinkLogin,
    isPendingMagicLinkLogin,
    errorMagicLink,
    isMagicLinkSent,
  } = useMagicLinkLogin();

  const formMagicLink = useForm<z.infer<typeof FormSchemaMagicLink>>({
    resolver: zodResolver(FormSchemaMagicLink),
  });

  const formEmailPassword = useForm<z.infer<typeof FormSchemaEmailPassword>>({
    resolver: zodResolver(FormSchemaEmailPassword),
  });

  async function onSubmitMagicLink(data: z.infer<typeof FormSchemaMagicLink>) {
    //await magicLinkLogin(data.email);
  }

  async function onSubmitEmailPassword(data: z.infer<typeof FormSchemaEmailPassword>) {
    //await magicLinkLogin(data.email);
  }
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full md:w-2/3 lg:w-1/2">
        {user ? (
          <div className="">
            <h1 className="text-center text-xl font-bold">
              Connected ! <br />
              {/* Hey {user.displayName} 👋 */}
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Button
              className="w-full"
              type="button"
              onClick={googleLogin}
              disabled={isPendingGoogleLogin}
            >
              {isPendingGoogleLogin ? (
                <Shell className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Globe2 className="mr-2 h-4 w-4" />
              )}
              Sign in with Google
            </Button>
            <span className="flex items-center justify-center mt-6">OR</span>
            <Form {...formMagicLink}>
              <form
                onSubmit={formMagicLink.handleSubmit(onSubmitMagicLink)}
                className="w-full space-y-6"
              >
                <FormField
                  control={formMagicLink.control}
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
                {isMagicLinkSent && (
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Link sent</CardTitle>
                      <CardDescription>
                        The link has been sent to the email address provided,
                        please click to connect
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isPendingMagicLinkLogin}
                >
                  {isPendingMagicLinkLogin ? (
                    <Shell className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Send magic link
                </Button>
              </form>
            </Form>
            <span className="flex items-center justify-center mt-6">OR</span>
            <Form {...formEmailPassword}>
              <form
                onSubmit={formEmailPassword.handleSubmit(onSubmitEmailPassword)}
                className="w-full space-y-6"
              >
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
                    type="submit"
                    disabled={isPendingMagicLinkLogin}
                  >
                    {isPendingMagicLinkLogin && (
                      <Shell className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Connexion
                  </Button>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isPendingMagicLinkLogin}
                  >
                    {isPendingMagicLinkLogin && (
                      <Shell className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
      <a
        href="https://github.com/ln-dev7/next-shadcn-firebase-auth-boilerplate"
        className={`absolute bottom-4 right-4 ${buttonVariants({
          size: "lg",
          variant: "outline",
        })}`}
      >
        <Github className="w-5 h-5 mr-2" />
        Use This Boilerplate
      </a>
    </main>
  );
}

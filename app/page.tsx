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

const FormSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please enter a valid email.",
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    await magicLinkLogin(data.email);
  }
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      {user ? (
        <div className="">
          <h1 className="text-center text-xl font-bold">
            {/* Hey {user.displayName} 👋 */}
          </h1>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full md:w-2/3 lg:w-1/2 space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="leonelngoya@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insert email for receive magic link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isMagicLinkSent && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Link sent</CardTitle>
                  <CardDescription>
                    The link has been sent to the email address provided, please
                    click to connect
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
            <span className="flex items-center justify-center mt-6">OR</span>
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
          </form>
        </Form>
      )}
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

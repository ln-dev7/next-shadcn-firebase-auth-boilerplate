"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, LogOut, Mail, Shell, Twitter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "./ui/use-toast";
import { useAuthContext } from "@/context/auth-context";
import { useLogout } from "@/firebase/auth/logout";

export function SiteHeader() {
  const { toast } = useToast();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <header className="fixed top-0 z-40 w-full border-b border-b-zinc-200 bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="w-full flex items-center gap-0 h-full">
          <Link
            href="/"
            className="flex h-full border-l px-4 items-center space-x-2"
          >
            <span className="inline-block font-bold">LN</span>
          </Link>
          <div className="flex items-center border-r border-l h-full gap-4 px-4">
            <a
              href="https://x.com/ln_dev7"
              className="rounded-full p-2 border flex items-center justify-center"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/ln-dev7"
              className="rounded-full p-2 border flex items-center justify-center"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {user ? (
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                className=""
                variant="destructive"
                type="button"
                onClick={logout}
              >
                  <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Avatar className="border-2">
                    <AvatarFallback className="uppercase font-bold">
                      {user.email?.charAt(0)}
                      {user.email?.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      window.navigator.clipboard.writeText(`${user.email}`);
                      toast({
                        title: "Email copied",
                        description: `${user.email}`,
                      });
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {user.email}
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

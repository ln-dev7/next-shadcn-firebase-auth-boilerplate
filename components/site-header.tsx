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

export function SiteHeader() {
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
              href="https://github.com/ln-dev7/"
              className="rounded-full p-2 border flex items-center justify-center"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <div className="flex items-center justify-center gap-4">
            <Button className="" variant="destructive" type="button">
              {false ? (
                <Shell className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              Logout
            </Button>
            <Popover>
              <PopoverTrigger>
                <Avatar className="border-2">
                  {/* <AvatarImage
                    src="https://avatars.githubusercontent.com/u/62269693?v=4"
                    alt="@ln_dev7"
                  /> */}
                  <AvatarFallback>LN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <Button className="w-full" variant="secondary" type="button">
                  <Mail className="mr-2 h-4 w-4" />
                  leonelngoya@gmail.com
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}

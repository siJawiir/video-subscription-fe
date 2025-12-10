"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ZIconButton } from "../buttons";
import { Show } from "../utils";
import Link from "next/link";

export function UserMenu() {
  const { data: session, status } = useSession();

  const username = session?.user.username || "Guest";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-red-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-[0_0_8px_rgba(255,0,0,0.7)] cursor-pointer hover:shadow-[0_0_15px_rgba(255,0,0,0.9)] transition">
          {username
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-64 p-4 space-y-3 bg-black/90 backdrop-blur border border-red-700 shadow-[0_0_15px_rgba(255,0,0,0.5)] rounded-xl flex flex-col"
        align="end"
      >
        <div className="border-b border-red-700 pb-3">
          <p className="text-sm font-semibold text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]">
            {username}
          </p>
        </div>

        <Show.When condition={status === "authenticated"}>
          <ZIconButton
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm font-medium text-red-500 hover:bg-red-900/20 hover:text-red-400 transition rounded-md"
            icon={
              <LogOutIcon name="log-out" className="w-4 h-4 text-red-400" />
            }
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </ZIconButton>
          <Show.Else>
            <>
              <Link
                href="/login"
                className="
                  flex items-center gap-2 w-full 
                  text-sm font-medium text-red-500 
                  hover:bg-red-900/20 hover:text-red-400 
                  transition rounded-md px-3 py-2
                "
              >
                <LogInIcon name="log-in" className="w-4 h-4 text-red-400" />
                Login
              </Link>
            </>
          </Show.Else>
        </Show.When>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Bell, Menu, Receipt, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ZIconButton } from "../buttons";
import { UserMenu } from "../templates";
import { Show } from "../utils";
import { USER_ROLES } from "@/constants/constants";
import { ZSearchInput } from "../inputs";

export default function AppNavbar() {
  const { data: session, status } = useSession();

  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const isAdmin = session?.user.role === USER_ROLES.ADMIN;

  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-black/90 border-b border-red-900/40 px-4 h-16 flex items-center justify-between shadow-[0_0_20px_rgba(255,0,0,0.3)]">
      <div className="flex items-center space-x-3 w-full ">
        <Show.When condition={isAdmin}>
          <ZIconButton
            variant="ghost"
            icon={
              <Menu className="w-6 h-6 text-red-400 hover:text-red-200 transition" />
            }
            onClick={toggleSidebar}
          />
        </Show.When>
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center group">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none text-red-500 drop-shadow-lg group-hover:text-red-400 transition-colors">
              PILEM
            </h1>
          </Link>
          <Show.When condition={!isAuthPage && !isAdmin}>
            <nav className="flex items-center space-x-4">
              <Link href="/videos" className="group relative">
                <span className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                  Movies
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-400 transition-all group-hover:w-full"></span>
              </Link>

              <Show.When condition={status === "authenticated"}>
                <Link href="/video-access" className="group relative">
                  <span className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                    My List
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-400 transition-all group-hover:w-full"></span>
                </Link>
              </Show.When>
            </nav>
          </Show.When>
        </div>
      </div>

      <Show.When condition={!isAuthPage && !isAdmin}>
        <div className="w-full">
          <ZSearchInput
            basePath="/videos"
            placeholder="Search Movies"
            searchKey="search"
          />
        </div>
      </Show.When>

      <div className="flex items-center justify-end space-x-4 w-full">
        <Show.When condition={status === "authenticated"}>
          <ZIconButton
            variant="ghost"
            icon={
              <Bell className="w-5 h-5 text-red-400 hover:text-red-200 transition" />
            }
            tooltip="Notifications"
          />
          <Show.When condition={!isAdmin}>
            <Link href="/cart">
              <ZIconButton
                variant="ghost"
                icon={
                  <ShoppingCart className="w-5 h-5 text-red-400 hover:text-red-200 transition" />
                }
                tooltip="Cart"
              />
            </Link>
            <Link href="/orders">
              <ZIconButton
                variant="ghost"
                icon={
                  <Receipt className="w-5 h-5 text-red-400 hover:text-red-200 transition" />
                }
                tooltip="Cart"
              />
            </Link>
          </Show.When>
        </Show.When>
        <Show.When condition={!isAuthPage}>
          <UserMenu />
        </Show.When>
      </div>
    </nav>
  );
}

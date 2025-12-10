"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";


import { USER_ROLES } from "@/constants/constants";
import { menu } from "@/constants/menus";
import { ChevronDown } from "lucide-react";
import { MenuItem } from "menu-types";
import { useSession } from "next-auth/react";
import Link from "next/link";

function renderSubItems(items: MenuItem[]) {
  return items.map((sub) => {
    if (sub.children) {
      return (
        <Collapsible key={sub.label} defaultOpen={false}>
          <SidebarMenuSubItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className="
                  group relative flex items-center justify-between gap-3 p-3 
                  text-red-300 rounded-md
                  bg-black/20 hover:bg-red-800/20 
                  border border-red-800/30 hover:border-red-600/40
                  transition-all duration-300
                  shadow-[0_0_6px_rgba(255,0,0,0.3)]
                "
              >
                  <div className="flex items-center gap-3">
                    <span className="drop-shadow-[0_0_3px_rgba(255,0,0,0.7)]">
                      {sub.label}
                    </span>
                  </div>
                <ChevronDown
                  className="
                    text-red-300 
                    transition-transform duration-300 
                    data-[state=open]:rotate-180
                  "
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub className="ml-5 mt-1 border-l border-red-800/30 pl-3">
                {renderSubItems(sub.children)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuSubItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuSubItem key={sub.label}>
        <SidebarMenuButton asChild>
          <Link
            href={sub.href!}
            className="
              group relative flex items-center gap-3 p-3 
              rounded-md text-red-200 
              hover:bg-red-900/20 
              transition-colors
              drop-shadow-[0_0_4px_rgba(255,0,0,0.6)]
            "
          >
              <span>{sub.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuSubItem>
    );
  });
}

function renderMenuItems(items: MenuItem[]) {
  return items.map((item) => {
    if (item.children) {
      return (
        <Collapsible key={item.label} defaultOpen={false}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.label}
                className="
                  group relative flex items-center justify-between gap-3 p-3 
                  rounded-lg transition-all duration-300
                  bg-black/30 hover:bg-red-900/30 
                  border border-red-900/40 hover:border-red-500/50
                  shadow-[0_0_8px_rgba(255,20,20,0.25)]
                "
              >
                  <div className="flex items-center gap-3 text-red-400">
                    {item.icon}
                    <span className="text-base font-semibold">
                      {item.label}
                    </span>
                  </div>

                <ChevronDown
                  className="
                    text-red-400 transition-transform duration-300 
                    data-[state=open]:rotate-180
                    drop-shadow-[0_0_4px_rgba(255,0,0,0.8)]
                  "
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub className="ml-5 mt-1 border-l border-red-800/40 pl-3">
                {renderSubItems(item.children)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.label}>
        <SidebarMenuButton asChild tooltip={item.label}>
          <Link
            href={item.href!}
            className="
              group relative flex items-center gap-3 p-3 rounded-lg 
              text-red-400 transition-all duration-300
              bg-black/20 hover:bg-red-900/30
              border border-red-900/40 hover:border-red-500/50
              shadow-[0_0_8px_rgba(255,20,20,0.3)]
              drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]
            "
          >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-base font-semibold">{item.label}</span>
              </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
}

export function AppSidebar() {
  const { data: session, status } = useSession();

  if (status !== "authenticated" || session.user.role !== USER_ROLES.ADMIN)
    return null;

  return (
    <Sidebar
      side="left"
      variant="floating"
      collapsible="icon"
      className="
        group
        mt-16 h-[calc(100vh-4rem)] pl-2 
        bg-black/95 
        shadow-[0_0_20px_rgba(255,0,0,0.4)]
        backdrop-blur-md
        border-r border-red-900/40
        transition-all duration-300
      "
    >
      <SidebarContent className="flex flex-col mt-4 pl-2 space-y-2">
        <SidebarMenu>{renderMenuItems(menu)}</SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

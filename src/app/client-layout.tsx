"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

import { AppFooter, AppNavbar, AppSidebar } from "@/components/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useScreenResolutionListener } from "@/hooks/useScreenResolution";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  useScreenResolutionListener();

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-col flex-1 h-screen w-screen">
          <AppNavbar />
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <QueryClientProvider client={queryClient}>
              <main className="flex-1 overflow-auto">{children}</main>
              {/* {process.env.NODE_ENV === "development" && <ReactQueryDevtools />} */}
            </QueryClientProvider>
          </div>
          <AppFooter />
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}

"use client";

import { ZSkeleton } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Activity,
  CheckCircle,
  Film,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useDashboardStats } from "./hooks/useDashboardStats";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const { data, isLoading } = useDashboardStats({
    enabled: !!session?.user.token,
  });

  if (status === "loading")
    return (
      <>
        <div className="w-full">
          <ZSkeleton variant="list" className="h-12" rows={6} />
        </div>
      </>
    );

  return (
    <div className="p-6 space-y-8">
      <Card
        className={cn(
          "relative overflow-hidden border border-gray-800",
          "bg-linear-to-br from-[#0f0f0f] to-[#1a1a1a]",
          "shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        )}
      >
        <div className="absolute inset-0 mask-[radial-gradient(circle_at_center,white,transparent)] opacity-20 bg-[url('/noise.svg')]" />

        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white tracking-wide">
            🎬 Welcome,{" "}
            <span className="text-red-400">{session?.user.username}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Separator className="bg-gray-800" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Videos",
            icon: <Film className="h-6 w-6 text-red-400" />,
            value: data?.total_videos,
          },
          {
            title: "Pending Orders",
            icon: <ShoppingCart className="h-6 w-6 text-yellow-400" />,
            value: data?.pending_orders,
          },
          {
            title: "Approved Orders",
            icon: <CheckCircle className="h-6 w-6 text-green-400" />,
            value: data?.approved_orders,
          },
          {
            title: "Rejected Orders",
            icon: <XCircle className="h-6 w-6 text-red-500" />,
            value: data?.rejected_orders,
          },
        ].map((item, i) => (
          <Card
            key={i}
            className={cn(
              "relative border border-gray-800",
              "bg-linear-to-br from-[#121212] to-[#1c1c1c]",
              "shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.07)]",
              "transition-all"
            )}
          >
            <div className="absolute inset-0 opacity-10 mask-[radial-gradient(circle_at_center,white,transparent)] bg-[url('/noise.svg')]" />

            <CardHeader className="flex flex-row items-center justify-between text-white">
              <CardTitle className="text-sm font-medium tracking-wide">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <ZSkeleton variant="list" rows={1} />
              ) : (
                <p className="text-4xl font-bold text-white tracking-tight">
                  {item.value || 0}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-gray-800" />

      <Card
        className={cn(
          "relative border border-gray-800",
          "bg-linear-to-br from-[#101010] to-[#1c1c1c]",
          "shadow-[0_0_15px_rgba(255,255,255,0.03)]"
        )}
      >
        <div className="absolute inset-0 opacity-10 mask-[radial-gradient(circle_at_center,white,transparent)] bg-[url('/noise.svg')]" />

        <CardHeader className="flex flex-row items-center gap-2 text-white">
          <Activity className="h-5 w-5 text-purple-400" />
          <CardTitle className="tracking-wide">Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-gray-400">
          <p>No recent activity</p>
        </CardContent>
      </Card>
    </div>
  );
}

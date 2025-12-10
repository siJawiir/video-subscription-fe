"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Film,
  ShoppingCart,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

type AdminDashboardStats = {
  totalVideos: number;
  totalPendingOrders: number;
  totalApprovedOrders: number;
  totalRejectedOrders: number;
};

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();

  const { data, isLoading } = useQuery<AdminDashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Gagal mengambil data");
      return res.json();
    },
    enabled: status === "authenticated",
  });

  if (status === "loading") return <Skeleton className="h-8 w-64" />;
  
  if (!session)
    return (
      <p className="p-6 text-red-800 font-medium text-center">
        Unauthorized — Silakan login
      </p>
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
            🎬 Selamat Datang,{" "}
            <span className="text-red-400">{session.user.username}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Separator className="bg-gray-800" />

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Film",
            icon: <Film className="h-6 w-6 text-red-400" />,
            value: data?.totalVideos,
          },
          {
            title: "Pending Orders",
            icon: <ShoppingCart className="h-6 w-6 text-yellow-400" />,
            value: data?.totalPendingOrders,
          },
          {
            title: "Approved Orders",
            icon: <CheckCircle className="h-6 w-6 text-green-400" />,
            value: data?.totalApprovedOrders,
          },
          {
            title: "Rejected Orders",
            icon: <XCircle className="h-6 w-6 text-red-500" />,
            value: data?.totalRejectedOrders,
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
                <Skeleton className="h-10 w-20 bg-gray-700" />
              ) : (
                <p className="text-4xl font-bold text-white tracking-tight">
                  {item.value}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-gray-800" />

      {/* Latest Activity */}
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
          <CardTitle className="tracking-wide">Transaksi Terakhir</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-gray-400">
          <p>Belum ada aktivitas terbaru...</p>
        </CardContent>
      </Card>
    </div>
  );
}

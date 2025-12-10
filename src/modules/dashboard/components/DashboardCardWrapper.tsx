import React from "react";

interface DashboardCardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export default function DashboardCardWrapper({
  title,
  description,
  children,
  className,
}: DashboardCardWrapperProps) {
  return (
    <div
      className={`rounded-2xl bg-linear-to-br from-zinc-900 to-black shadow-xl p-6 border border-zinc-800 ${className}`}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white tracking-wide">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

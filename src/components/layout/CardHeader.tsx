"use client"; // wajib di paling atas

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function CardHeader({
  title = "Movies",
  subtitle,
}: CardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm lg:text-base text-rose-300/70 drop-shadow-[0_0_4px_rgba(255,0,0,0.5)] mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

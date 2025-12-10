export const metadata = {
  title: "PILEM",
  description:
    "Semua film terbaik ada di PILEM. Nikmati streaming film berkualitas tinggi kapan saja, di mana saja.",
};

interface VideoAccessLayoutProps {
  children: React.ReactNode;
}
export default function VideoAccessLayout({
  children,
}: VideoAccessLayoutProps) {
  return <div className="min-h-screen bg-gray-950 text-white">{children}</div>;
}

export const metadata = {
  title: "PILEM",
  description:
    "Semua film terbaik ada di PILEM. Nikmati streaming film berkualitas tinggi kapan saja, di mana saja.",
};

interface VideoLayoutProps {
  children: React.ReactNode;
}
export default function VideoLayout({ children }: VideoLayoutProps) {
  return <div className="min-h-screen bg-gray-950 text-white">{children}</div>;
}

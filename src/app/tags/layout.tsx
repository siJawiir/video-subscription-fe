import Tags from "@/modules/tags/Tags";

export const metadata = {
  title: "PILEM",
  description:
    "Semua film terbaik ada di PILEM. Nikmati streaming film berkualitas tinggi kapan saja, di mana saja.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Tags />
    </div>
  );
}

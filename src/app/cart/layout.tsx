import Cart from "@/modules/cart/Cart";

export const metadata = {
  title: "PILEM",
  description:
    "Semua film terbaik ada di PILEM. Nikmati streaming film berkualitas tinggi kapan saja, di mana saja.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Cart />
    </div>
  );
}

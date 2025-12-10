import { Show, ZNoVideoFound, ZSkeleton } from "@/components";
import { useCartContext } from "../context/useCartContext";
import { useCart } from "../hooks/useCart";
import CartItemCard from "./CartItemCard";

export default function CartList() {
  const { selectedItems, setSelectedItems } = useCartContext();

  const handleSelect = (id: number) => {
    setSelectedItems((prev) =>
      (prev ?? []).includes(id)
        ? (prev ?? []).filter((x) => x !== id)
        : [...(prev ?? []), id]
    );
  };

  const query = useCart({
    enabled: true,
  });

  const cart = query.data;

  return (
    <>
      <Show.When condition={query.isPending}>
        <ZSkeleton variant="card" orientation="vertical" rows={3} />
      </Show.When>

      <Show.When condition={!query.isPending && !cart}>
        <ZNoVideoFound />
      </Show.When>

      <Show.When condition={!query.isPending && !!cart}>
        <div className="flex flex-col gap-4">
          {cart?.items.map((item) => (
            <CartItemCard
              key={item.cart_item_id}
              cart={item}
              handleSelect={(data) => handleSelect(data.cart_item_id)}
              isSelected={(selectedItems ?? []).includes(item.cart_item_id)}
            />
          ))}
        </div>
      </Show.When>
    </>
  );
}

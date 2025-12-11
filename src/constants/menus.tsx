import { Film, Layers, ShoppingBag, Tags } from "lucide-react";
import { MenuItem } from "menu-types";

export const menu: MenuItem[] = [
  {
    label: "Videos",
    icon: <Film size={16} />,
    href: "/admin/videos",
  },
  {
    label: "Categories",
    icon: <Layers size={16} />,
    href: "/admin/categories",
  },
  {
    label: "Tags",
    icon: <Tags size={16} />,
    href: "/admin/tags",
  },
  {
    label: "Orders",
    icon: <ShoppingBag size={16} />,
    href: "/admin/orders",
  },
];

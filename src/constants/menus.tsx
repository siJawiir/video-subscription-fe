import { Film, Layers, Tags } from "lucide-react";
import { MenuItem } from "menu-types";

export const menu: MenuItem[] = [
  {
    label: "Film",
    icon: <Film size={16} />,
    href: "/",
  },
  {
    label: "Kategori",
    icon: <Layers size={16} />,
    href: "/categories",
  },
  {
    label: "Tag",
    icon: <Tags size={16} />,
    href: "/tags",
  },
];

declare module "menu-types" {
  interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: MenuItem[];
  }
}

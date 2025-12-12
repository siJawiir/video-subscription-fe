declare module "admin-order-types" {
  export interface OrderFormType {
    order_id: number | null;
    type?: "approved" | "rejected";
  }
}

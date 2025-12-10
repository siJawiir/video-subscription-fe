declare module "resource-types" {
  interface ResourceType {
    value: string | number;
    label: string;
    description?: string;
  }
}

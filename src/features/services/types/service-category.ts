export type ServiceCategoryId =
  | "haircut"
  | "shave"
  | "styling";

export type ServiceCategoryIconName =
  | "scissors"
  | "razor"
  | "hair-dryer";

export type ServiceCategory = {
  id: ServiceCategoryId;
  label: string;
  iconName: ServiceCategoryIconName;
};
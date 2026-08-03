import type { ServiceCategoryId } from "./service-category";

export type BarberService = {
  id: string;
  categoryId: ServiceCategoryId;
  name: string;
  durationMinutes: number;
  price: number;
  currency: "EUR";
};
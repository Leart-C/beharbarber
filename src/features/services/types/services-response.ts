import type { ServiceCategoryId } from "./service-category";

export type ServiceApiItem = {
    id: string;
    categoryId: string,
    name: string,
    durationMinutes: number;
    priceCents: number;
    currency: "EUR";
};

export type ServiceApiCategory = {
    id: string;
    name: string;
    slug: ServiceCategoryId;
    services: ServiceApiItem[];
}

export type ServicesResponse = {
    categories: ServiceApiCategory[];
}
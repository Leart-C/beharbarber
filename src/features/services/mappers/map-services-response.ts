import { serviceCategoriesMetadata as categoryMetadata, serviceCategoriesMetadata } from "../data/service-category-metadata.ts";
import type { BarberService } from "../types/service";
import type { ServiceCategory } from "../types/service-category";
import type { ServicesResponse } from "../types/services-response";

export type ServiceCatalog = {
  categories: ServiceCategory[];
  services: BarberService[];
};

export function mapServicesResponse(
  response: ServicesResponse,
): ServiceCatalog {
  const categories: ServiceCategory[] = response.categories.map((category) => {
    const metadata = serviceCategoriesMetadata.find((item) => item.id === category.slug);

    return {
      id: category.slug,
      label: category.name,
      symbol: metadata?.symbol ?? "•",
    };
  });

  const services: BarberService[] = response.categories.flatMap((category) =>
    category.services.map((service) => ({
      id: service.id,
      categoryId: category.slug,
      name: service.name,
      durationMinutes: service.durationMinutes,

      // The API stores €6 as 600 cents.
      // The current UI displays it as 6.
      price: service.priceCents / 100,

      currency: service.currency,
    })),
  );

  return {
    categories,
    services,
  };
}

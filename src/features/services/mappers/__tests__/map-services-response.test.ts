import type { ServicesResponse } from "../../types/services-response";
import { mapServicesResponse } from "../map-services-response";

describe("mapServicesResponse", () => {
  it("maps API categories and converts cents to euros", () => {
    const response: ServicesResponse = {
      categories: [
        {
          id: "category-id",
          name: "Qethje",
          slug: "haircut",
          services: [
            {
              id: "service-id",
              categoryId: "category-id",
              name: "Fade",
              durationMinutes: 40,
              priceCents: 750,
              currency: "EUR",
            },
          ],
        },
      ],
    };

    const catalog = mapServicesResponse(response);

    expect(catalog.categories).toEqual([
      {
        id: "haircut",
        label: "Qethje",
        iconName: "scissors",
      },
    ]);
    expect(catalog.services).toEqual([
      {
        id: "service-id",
        categoryId: "haircut",
        name: "Fade",
        durationMinutes: 40,
        price: 7.5,
        currency: "EUR",
      },
    ]);
  });

  it("preserves empty categories", () => {
    const response: ServicesResponse = {
      categories: [
        {
          id: "category-id",
          name: "Stilim",
          slug: "styling",
          services: [],
        },
      ],
    };

    const catalog = mapServicesResponse(response);

    expect(catalog.categories).toHaveLength(1);
    expect(catalog.services).toEqual([]);
  });
});

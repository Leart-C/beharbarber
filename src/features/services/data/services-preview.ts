import type { BarberService } from "../types/service";

export const servicesPreview: BarberService[] = [
  {
    id: "haircut-standard",
    categoryId: "haircut",
    name: "Qethje",
    durationMinutes: 30,
    price: 6,
    currency: "EUR",
  },
  {
    id: "haircut-fade",
    categoryId: "haircut",
    name: "Fade",
    durationMinutes: 40,
    price: 7,
    currency: "EUR",
  },
  {
    id: "haircut-children",
    categoryId: "haircut",
    name: "Qethje fëmijësh",
    durationMinutes: 30,
    price: 5,
    currency: "EUR",
  },
  {
    id: "shave-standard",
    categoryId: "shave",
    name: "Rroje",
    durationMinutes: 20,
    price: 4,
    currency: "EUR",
  },
  {
    id: "beard-shaping",
    categoryId: "shave",
    name: "Formësim i mjekrës",
    durationMinutes: 25,
    price: 5,
    currency: "EUR",
  },
  {
    id: "hair-styling",
    categoryId: "styling",
    name: "Stilim",
    durationMinutes: 20,
    price: 4,
    currency: "EUR",
  },
];
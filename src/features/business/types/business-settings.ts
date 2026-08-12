export type BusinessLanguage = "sq" | "en";

export type BusinessSettings = {
  businessName: string;
  publicBarberName: string;
  address: string | null;
  phone: string | null;
  contactEmail: string | null;
  googleMapsUrl: string | null;
  instagramUrl: string | null;
  defaultLanguage: BusinessLanguage;
  timeZone: string;
};

export type BusinessSettingsResponse = {
  business: BusinessSettings;
};
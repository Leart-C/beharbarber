export type ServiceCategoryId = "haircut" | "shave" | "styling";

export type ServiceCategory = {
    id:ServiceCategoryId;
    label: string;
    symbol: string;
}
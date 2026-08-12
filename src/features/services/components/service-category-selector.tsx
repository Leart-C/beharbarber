import {
  Pressable,
  Text,
  View,
} from "react-native";

import { useTranslation } from "@/features/localization/hooks/use-translation";
import { brandColors } from "@/theme/colors";

import type {
  ServiceCategory,
  ServiceCategoryId,
} from "../types/service-category";
import { ServiceCategoryIcon } from "./service-category-icon";
import { styles } from "./service-category-selector.styles";

type ServiceCategorySelectorProps = {
  categories: ServiceCategory[];
  selectedCategoryId: ServiceCategoryId;
  onSelectCategory: (
    categoryId: ServiceCategoryId,
  ) => void;
};

export function ServiceCategorySelector({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: ServiceCategorySelectorProps) {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.heading}>
        {t("serviceCategories.heading")}
      </Text>

      <View style={styles.categories}>
        {categories.map((category) => {
          const isSelected =
            category.id === selectedCategoryId;

          const categoryLabel = t(
            `serviceCategories.${category.id}`,
          );

          return (
            <Pressable
              key={category.id}
              accessibilityRole="button"
              accessibilityLabel={categoryLabel}
              accessibilityState={{
                selected: isSelected,
              }}
              onPress={() =>
                onSelectCategory(category.id)
              }
              style={styles.categoryPressable}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.category,
                    isSelected &&
                      styles.selectedCategory,
                    pressed &&
                      styles.pressedCategory,
                  ]}
                >
                  <ServiceCategoryIcon
                    name={category.iconName}
                    size={30}
                    color={
                      isSelected
                        ? brandColors.white
                        : "rgba(255, 255, 255, 0.66)"
                    }
                  />

                  <Text
                    style={[
                      styles.label,
                      isSelected &&
                        styles.selectedText,
                    ]}
                  >
                    {categoryLabel}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
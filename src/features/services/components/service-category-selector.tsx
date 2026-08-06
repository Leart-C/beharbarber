import { Pressable, Text, View } from "react-native";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import type {
  ServiceCategory,
  ServiceCategoryId,
} from "../types/service-category";
import { styles } from "./service-category-selector.styles";

type ServiceCategorySelectrProps = {
    categories: ServiceCategory[];
    selectedCategoryId: ServiceCategoryId;
    onSelectCategory: (categoryId: ServiceCategoryId) => void;
}

export function ServiceCategorySelector({categories,selectedCategoryId,onSelectCategory}:ServiceCategorySelectrProps){
    const { t } = useTranslation();
    return(
        <View>
            <Text style={styles.heading}>{t("serviceCategories.heading")}</Text>

            <View style={styles.categories}>
                {categories.map((category)=>{
                    const isSelected = category.id === selectedCategoryId;
                    const categoryLabel = t(`serviceCategories.${category.id}`);

                    return(
                        <Pressable
                            key={category.id}
                            accessibilityRole="button"
                            accessibilityLabel={categoryLabel}
                            accessibilityState={{selected: isSelected}}
                            onPress={()=>onSelectCategory(category.id)}
                            style={styles.categoryPressable}
                        >
                            {({pressed})=>(
                                <View
                                   style={[
                                        styles.category,
                                        isSelected && styles.selectedCategory,
                                        pressed && styles.pressedCategory,
                                    ]} 
                                >
                                    <Text
                                        style={[
                                            styles.symbol,
                                            isSelected && styles.selectedText,
                                        ]}
                                    >
                                        {category.symbol}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.label,
                                            isSelected && styles.selectedText,
                                        ]}
                                    >
                                        {categoryLabel}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

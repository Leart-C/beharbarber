import { Pressable, Text, View } from "react-native";

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
    return(
        <View>
            <Text style={styles.heading}>Kategoritë</Text>

            <View style={styles.categories}>
                {categories.map((category)=>{
                    const isSelected = category.id === selectedCategoryId;

                    return(
                        <Pressable
                            key={category.id}
                            accessibilityRole="button"
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
                                        {category.label}
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
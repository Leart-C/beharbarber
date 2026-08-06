import { Pressable, Text, View } from "react-native";

import { styles } from "./language-toggle.styles";

import type { AppLanguage } from "@/features/localization/types/app-language";

type LanguageToggleProps = {
    value: AppLanguage;
    onChange: (language: AppLanguage) => void;
};

type LanguageOptionProps = {
    label: string;
    value: AppLanguage;
    selectedLanguage: AppLanguage;
    onChange: (language: AppLanguage) => void;
}

function LanguageOption({label,value,selectedLanguage,onChange,}:LanguageOptionProps){
    const isSelected = value === selectedLanguage;

    return(
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={
                value === "sq" ? "Shqip" : "English"
            }
            accessibilityState={{
                selected: isSelected,
            }}
            onPress={()=>onChange(value)}
            style={[
                styles.option,
                isSelected && styles.selectedOption,
            ]}
        >
            <Text
                style={[
                    styles.label,
                    isSelected && styles.selectedLabel,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    )
}

export function LanguageToggle({value,onChange}:LanguageToggleProps){
    return(
        <View style={styles.container}>
            <LanguageOption
                label="SQ"
                value="sq"
                selectedLanguage={value}
                onChange={onChange}
            />

            <LanguageOption
                label="EN"
                value="en"
                selectedLanguage={value}
                onChange={onChange}
            />
        </View>
    )
}


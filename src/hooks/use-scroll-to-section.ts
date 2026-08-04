import {useCallback,useRef,} from "react";
import type {LayoutChangeEvent, ScrollView,} from "react-native";

type UseScrollToSectionOptions = {
    offset?: number;
}

export function useScrollToSection({offset = 20}:UseScrollToSectionOptions={}){
    const scrollViewRef = useRef<ScrollView>(null);
    const sectionYRef = useRef(0);

    const handleSectionLayout = useCallback(
        (event: LayoutChangeEvent) => {
            sectionYRef.current = event.nativeEvent.layout.y;
        },
        [],
    );

    const scrollToSection = useCallback(()=>{
        requestAnimationFrame(()=>{
            scrollViewRef.current?.scrollTo({
                y: Math.max(
                    sectionYRef.current - offset,
                    0,
                ),
                animated: true,
            });
        });
    },[offset]);

    return {scrollViewRef,handleSectionLayout,scrollToSection};
}
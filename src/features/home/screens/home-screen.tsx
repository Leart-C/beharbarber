import { useState } from "react";
import {
  Alert,
  ScrollView,
  View,
} from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { UpcomingAppointmentCard } from "@/features/appointments/components/upcoming-appointment-card";
import { appointmentPreview } from "@/features/appointments/data/appointment-preview";

import { BarberAlert } from "../components/barber-alert";
import { HomeHeader } from "../components/home-header";
import {
  type AppLanguage,
  LanguageToggle,
} from "../components/language-toggle";
import { styles } from "./home-screen.styles";
import { ServiceCategorySelector } from "@/features/services/components/service-category-selector";
import { serviceCategories } from "@/features/services/data/service-categories";
import type { ServiceCategoryId } from "@/features/services/types/service-category";
import { ServiceCard } from "@/features/services/components/service-card";
import { servicesPreview } from "@/features/services/data/services-preview";
import { ServiceList } from "@/features/services/components/service-list";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { router } from "expo-router";

export function HomeScreen() {
  const {
    scrollViewRef: homeScrollViewRef,
    handleSectionLayout: handleServiceListLayout,
    scrollToSection: scrollToServiceList,
  } = useScrollToSection({
    offset: 20,
  });

  const [language, setLanguage] =
    useState<AppLanguage>("sq");

  const [isAlertVisible, setIsAlertVisible] =
    useState(true);

  const [selectedCategoryId,setSelectedCategoryId] = useState<ServiceCategoryId>("haircut");

  const selectedCategory = serviceCategories.find(
    (category) => category.id === selectedCategoryId,
  );

  const filteredServices = servicesPreview.filter(
    (service) => service.categoryId === selectedCategoryId,
  );

  const handleEditAppointment = () => {
    Alert.alert(
      "Ndrysho terminin",
      "Ndryshimi i terminit do të ndërtohet në hapin e rezervimeve.",
    );
  };

  const handleCancelAppointment = () => {
    Alert.alert(
      "Anulo terminin",
      "Anulimi i terminit do të lidhet me backend-in më vonë.",
    );
  };

  const handleSelectCategory = (
    categoryId: ServiceCategoryId,
  ) => {
    setSelectedCategoryId(categoryId);
    scrollToServiceList();
  };

  return (
    <SafeAreaScreen
      edges={["left", "right"]}
      className="bg-background"
    >
      <ScrollView
        ref={homeScrollViewRef}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        <HomeHeader
          rightAccessory={
            <LanguageToggle
              value={language}
              onChange={setLanguage}
            />
          }
        />

        <View style={styles.content}>
          {isAlertVisible ? (
            <BarberAlert
              message="Të premten mbyllim herët, në 15:00."
              onDismiss={() => setIsAlertVisible(false)}
            />
          ) : null}

          <UpcomingAppointmentCard
            appointment={appointmentPreview}
            onEdit={handleEditAppointment}
            onCancel={handleCancelAppointment}
          />

          <ServiceCategorySelector
            categories={serviceCategories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />

          <View style={styles.servicesList} onLayout={handleServiceListLayout}>
            <ServiceList
              title={selectedCategory?.label ?? "Shërbimet"}
              symbol={selectedCategory?.symbol ?? ""}
              services={filteredServices}
              onAddService={(service) => {
                router.push({
                  pathname:"/booking/[serviceId]",
                  params:{
                    serviceId: service.id,
                  },
                })
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaScreen>
  );
}
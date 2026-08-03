import { Text, View } from "react-native";

import type { BarberService } from "../types/service";
import { ServiceCard } from "./service-card";
import { styles } from "./service-list.styles";

type ServiceListProps = {
    title: string,
    symbol: string,
    services: BarberService[],
    onAddService: (service: BarberService) => void;
}

export function ServiceList({title,services,symbol,onAddService}:ServiceListProps){
    return(
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.count}>
                    {services.length} shërbime
                </Text>
            </View>

            {services.length > 0 ? (
                <View style={styles.list}>
                    {services.map((service)=>(
                        <ServiceCard
                            key={service.id}
                            service={service}
                            symbol={symbol}
                            onAdd={onAddService}
                        />
                    ))}
                </View>
            ): (
                <Text style={styles.emptyMessage}>
                    Nuk ka shërbime në këtë kategori.
                </Text>
            )}
        </View>

        
    )
}
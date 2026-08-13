export type Appointment = {
    id:string;
    serviceId:string;
    startsAt: string;
    serviceName: string;
    durationMinutes: number;
    price: number;
    currency: "EUR";
}
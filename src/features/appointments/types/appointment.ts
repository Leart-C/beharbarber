export type Appointment = {
    id:string;
    startsAt: string;

    serviceName: string;
    durationMinutes: number;

    price: number;
    currency: "EUR";
}
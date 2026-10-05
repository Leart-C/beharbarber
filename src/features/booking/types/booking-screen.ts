export type BookingScreenProps = {
  serviceId: string;
  appointmentId?: string;
  mode?: "create" | "reschedule";
};

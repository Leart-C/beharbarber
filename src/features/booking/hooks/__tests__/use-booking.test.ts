import { act, renderHook } from "@testing-library/react-native";
import { useBooking } from "../use-booking";
import { remoteAppointment } from "@/test-support/appointment";
import { mapAppointment } from "@/features/appointments/mappers/map-appointment";

const mockSubmit = jest.fn((_options: unknown) => ({}));
const mockBooked = mapAppointment(remoteAppointment);
const mockRefresh = jest.fn();
const mockRequest = jest.fn();
const mockSlot = {
  id: "slot",
  startsAt: "2030-08-13T09:30:00Z",
  label: "11:30",
  isAvailable: true,
};
jest.mock("@/features/services/hooks/use-services", () => ({
  useServices: () => ({
    services: [
      {
        id: "service-1",
        name: "New name",
        price: 20,
        durationMinutes: 90,
        categoryId: "haircut",
      },
    ],
    categories: [],
    isLoading: false,
    error: null,
  }),
}));
jest.mock("@/features/schedule/hooks/use-working-days", () => ({
  useWorkingDays: () => ({
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    isLoading: false,
    error: null,
  }),
}));
jest.mock("@/features/appointments/hooks/use-appointments", () => ({
  useAppointments: () => ({
    appointments: [mockBooked],
    isLoading: false,
    error: null,
  }),
}));
jest.mock("@/features/localization/hooks/use-translation", () => ({
  useTranslation: () => ({ language: "en" }),
}));
jest.mock("@/hooks/use-current-time", () => ({
  useCurrentTime: () => Date.parse("2030-08-13T08:00:00Z"),
}));
jest.mock("@/hooks/use-authenticated-api", () => ({
  useAuthenticatedApi: () => ({ authenticatedRequest: mockRequest }),
}));
jest.mock("../use-availability", () => ({
  useAvailability: () => ({
    timeSlots: [mockSlot],
    isLoading: false,
    error: null,
    refreshAvailability: mockRefresh,
  }),
}));
jest.mock("../use-booking-submission", () => ({
  useBookingSubmission: (options: unknown) => mockSubmit(options),
}));

it("uses the original booking snapshot when the catalog has changed", async () => {
  const { result } = await renderHook(() =>
    useBooking({
      serviceId: "service-1",
      appointmentId: "appointment-1",
      mode: "reschedule",
    }),
  );
  expect(result.current.service).toMatchObject({
    name: "Fade",
    price: 7,
    durationMinutes: 30,
  });
  expect(result.current.invalidRoute).toBe(false);
});

it("does not treat a malformed reschedule link as a new booking", async () => {
  const { result } = await renderHook(() =>
    useBooking({ serviceId: "service-1", mode: "reschedule" }),
  );
  expect(result.current.invalidRoute).toBe(true);
});

it("clears the chosen time when the date changes or the server reports a conflict", async () => {
  const { result } = await renderHook(() =>
    useBooking({ serviceId: "service-1" }),
  );
  await act(() => result.current.selectTime("slot"));
  expect(result.current.selectedTimeId).toBe("slot");
  await act(() => result.current.selectDate(result.current.dates[1].id));
  expect(result.current.selectedTime).toBeUndefined();
  await act(() => result.current.selectTime("slot"));
  const options = mockSubmit.mock.calls.at(-1)?.[0] as unknown as {
    onConflict: () => void;
  };
  await act(() => options.onConflict());
  expect(result.current.selectedTime).toBeUndefined();
  expect(mockRefresh).toHaveBeenCalled();
});

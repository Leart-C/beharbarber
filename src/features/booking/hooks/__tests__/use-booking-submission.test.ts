import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useBookingSubmission } from "../use-booking-submission";
import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";
import { ApiError } from "@/lib/api/api-client";
import { remoteAppointment } from "@/test-support/appointment";
import { deferred } from "@/test-support/deferred";

const mockAdd = jest.fn();
const mockUpdate = jest.fn();
jest.mock("@/features/appointments/hooks/use-appointments", () => ({
  useAppointments: () => ({
    addAppointment: mockAdd,
    updateAppointment: mockUpdate,
  }),
}));
jest.mock("@/features/localization/hooks/use-translation", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock("@/config/env", () => ({ env: { apiUrl: "https://example.test" } }));

const selectedTime = {
  id: remoteAppointment.startsAt,
  startsAt: remoteAppointment.startsAt,
  label: "11:30",
  isAvailable: true,
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Alert, "alert").mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

it("locks synchronously against double taps and remains locked after success", async () => {
  const pending = deferred<{ appointment: typeof remoteAppointment }>();
  const request = jest.fn().mockReturnValue(pending.promise);
  const { result } = await renderHook(() =>
    useBookingSubmission({
      serviceId: "service-1",
      authenticatedRequest: request as AuthenticatedRequest,
      selectedTime,
      onConflict: jest.fn(),
    }),
  );
  let first!: Promise<void>;
  await act(() => {
    first = result.current.submit();
    void result.current.submit();
  });
  expect(request).toHaveBeenCalledTimes(1);
  await act(async () => {
    pending.resolve({ appointment: remoteAppointment });
    await first;
  });
  expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({ price: 7 }));
  await act(() => result.current.submit());
  expect(request).toHaveBeenCalledTimes(1);
  expect(result.current.isConfirmationVisible).toBe(true);
});

it("refreshes availability after a conflict and allows a retry", async () => {
  const request = jest
    .fn()
    .mockRejectedValueOnce(new ApiError("Slot unavailable", 409))
    .mockResolvedValueOnce({ appointment: remoteAppointment });
  const onConflict = jest.fn();
  const { result } = await renderHook(() =>
    useBookingSubmission({
      serviceId: "service-1",
      authenticatedRequest: request as AuthenticatedRequest,
      selectedTime,
      onConflict,
    }),
  );
  await act(() => result.current.submit());
  expect(onConflict).toHaveBeenCalledTimes(1);
  expect(mockAdd).not.toHaveBeenCalled();
  expect(result.current.isSubmitting).toBe(false);
  await act(() => result.current.submit());
  expect(mockAdd).toHaveBeenCalledTimes(1);
});

it("uses PATCH and updates existing state in reschedule mode", async () => {
  const request = jest
    .fn()
    .mockResolvedValue({ appointment: remoteAppointment });
  const { result } = await renderHook(() =>
    useBookingSubmission({
      serviceId: "service-1",
      appointmentId: "appointment-1",
      mode: "reschedule",
      authenticatedRequest: request as AuthenticatedRequest,
      selectedTime,
      onConflict: jest.fn(),
    }),
  );
  await act(() => result.current.submit());
  expect(request).toHaveBeenCalledWith(
    "/api/v1/appointments/appointment-1",
    expect.objectContaining({ method: "PATCH" }),
  );
  expect(mockUpdate).toHaveBeenCalledTimes(1);
  expect(mockAdd).not.toHaveBeenCalled();
});

it.each([
  { mode: "reschedule" as const, selectedTime },
  { selectedTime: { ...selectedTime, isAvailable: false } },
  { selectedTime: { ...selectedTime, startsAt: "2020-01-01T00:00:00Z" } },
  { selectedTime: { ...selectedTime, startsAt: "invalid" } },
])(
  "does not submit a missing appointment id or an invalid slot: %j",
  async (options) => {
    const request = jest.fn();
    const { result } = await renderHook(() =>
      useBookingSubmission({
        serviceId: "service-1",
        authenticatedRequest: request as AuthenticatedRequest,
        onConflict: jest.fn(),
        ...options,
      }),
    );
    await act(() => result.current.submit());
    expect(request).not.toHaveBeenCalled();
  },
);

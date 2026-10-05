import { act, renderHook } from "@testing-library/react-native";
import type { GetAppointmentsResponse } from "../../api/get-appointments";
import { mapAppointment } from "../../mappers/map-appointment";
import { useRemoteAppointments } from "../use-remote-appointments";
import { remoteAppointment } from "@/test-support/appointment";
import { deferred } from "@/test-support/deferred";

const mockRequest = jest.fn();
jest.mock("@/hooks/use-authenticated-api", () => ({
  useAuthenticatedApi: () => ({
    authenticatedRequest: mockRequest,
    isAuthLoaded: true,
    isSignedIn: true,
  }),
}));

beforeEach(() => mockRequest.mockReset());

it("does not let an old GET overwrite a successful reschedule", async () => {
  const pending = deferred<GetAppointmentsResponse>();
  const fresh = deferred<GetAppointmentsResponse>();
  mockRequest
    .mockReturnValueOnce(pending.promise)
    .mockReturnValueOnce(fresh.promise);
  const { result } = await renderHook(useRemoteAppointments);
  const updated = mapAppointment({
    ...remoteAppointment,
    startsAt: "2030-08-13T11:00:00.000Z",
  });
  await act(() => result.current.upsertAppointment(updated));
  expect(mockRequest.mock.calls[0][1].signal.aborted).toBe(true);
  await act(() => pending.resolve({ appointments: [remoteAppointment] }));
  expect(result.current.appointments).toEqual([updated]);
  expect(result.current.isLoading).toBe(false);
  await act(() =>
    fresh.resolve({
      appointments: [
        { ...remoteAppointment, startsAt: updated.startsAt },
        { ...remoteAppointment, id: "other-appointment" },
      ],
    }),
  );
  expect(result.current.appointments.map((item) => item.id)).toEqual([
    "appointment-1",
    "other-appointment",
  ]);
});

it("does not resurrect a cancelled appointment from a stale response", async () => {
  mockRequest.mockResolvedValueOnce({ appointments: [remoteAppointment] });
  const { result } = await renderHook(useRemoteAppointments);
  expect(result.current.appointments).toHaveLength(1);
  const pending = deferred<GetAppointmentsResponse>();
  mockRequest.mockReturnValueOnce(pending.promise);
  await act(() => result.current.refreshAppointments());
  await act(() => result.current.removeAppointment(remoteAppointment.id));
  await act(() => pending.resolve({ appointments: [remoteAppointment] }));
  expect(result.current.appointments).toEqual([]);
});

it("filters terminal and past appointments and maps prices once", async () => {
  mockRequest.mockResolvedValue({
    appointments: [
      remoteAppointment,
      { ...remoteAppointment, id: "cancelled", status: "cancelled" },
      { ...remoteAppointment, id: "past", startsAt: "2020-01-01T00:00:00Z" },
    ],
  });
  const { result } = await renderHook(useRemoteAppointments);
  expect(result.current.appointments).toEqual([
    mapAppointment(remoteAppointment),
  ]);
  expect(result.current.appointments[0].price).toBe(7);
});

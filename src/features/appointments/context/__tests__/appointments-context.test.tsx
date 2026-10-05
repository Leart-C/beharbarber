import { act, renderHook } from "@testing-library/react-native";
import { AppointmentsProvider } from "../appointments-context";
import { useAppointments } from "../../hooks/use-appointments";
import type { GetAppointmentsResponse } from "../../api/get-appointments";
import { remoteAppointment } from "@/test-support/appointment";
import { deferred } from "@/test-support/deferred";

let mockSessionId: string | null = "first-session";
const mockRequest = jest.fn();
jest.mock("@clerk/expo", () => ({
  useAuth: () => ({ sessionId: mockSessionId }),
}));
jest.mock("@/hooks/use-authenticated-api", () => ({
  useAuthenticatedApi: () => ({
    authenticatedRequest: mockRequest,
    isAuthLoaded: true,
    isSignedIn: Boolean(mockSessionId),
  }),
}));

it("clears private appointments on sign-out and ignores the old account's late response", async () => {
  mockSessionId = "first-session";
  mockRequest.mockResolvedValueOnce({ appointments: [remoteAppointment] });
  const { result, rerender } = await renderHook(useAppointments, {
    wrapper: AppointmentsProvider,
  });
  expect(result.current.appointments).toHaveLength(1);
  const pending = deferred<GetAppointmentsResponse>();
  mockRequest.mockReturnValueOnce(pending.promise);
  await act(() => result.current.refreshAppointments());
  mockSessionId = null;
  await rerender(undefined);
  expect(result.current.appointments).toEqual([]);
  await act(() => pending.resolve({ appointments: [remoteAppointment] }));
  expect(result.current.appointments).toEqual([]);
  mockRequest.mockResolvedValueOnce({ appointments: [] });
  mockSessionId = "second-session";
  await rerender(undefined);
  expect(result.current.appointments).toEqual([]);
});

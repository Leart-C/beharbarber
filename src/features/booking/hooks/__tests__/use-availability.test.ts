import { act, renderHook } from "@testing-library/react-native";
import { useAvailability } from "../use-availability";
import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";
import { deferred } from "@/test-support/deferred";

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it("hides previous slots immediately and rejects out-of-order responses", async () => {
  const old = deferred<{
    timeSlots: { startsAt: string; available: boolean }[];
  }>();
  const request = jest
    .fn()
    .mockReturnValueOnce(old.promise)
    .mockResolvedValueOnce({
      timeSlots: [{ startsAt: "2030-08-14T09:00:00.000Z", available: true }],
    });
  const { result, rerender } = await renderHook(
    ({ date }: { date: string }) =>
      useAvailability({
        serviceId: "service-1",
        date,
        authenticatedRequest: request as AuthenticatedRequest,
      }),
    { initialProps: { date: "2030-08-13" } },
  );
  await act(() => jest.advanceTimersByTime(150));
  await rerender({ date: "2030-08-14" });
  expect(result.current.timeSlots).toEqual([]);
  expect(result.current.isLoading).toBe(true);
  await act(() => jest.advanceTimersByTime(150));
  await act(() =>
    old.resolve({
      timeSlots: [{ startsAt: "2030-08-13T09:00:00.000Z", available: true }],
    }),
  );
  expect(result.current.timeSlots[0].startsAt).toBe("2030-08-14T09:00:00.000Z");
  expect(result.current.timeSlots[0].label).toBe("11:00");
});

it("invalidates visible slots on refresh and aborts pending work on unmount", async () => {
  const request = jest
    .fn()
    .mockResolvedValue({
      timeSlots: [{ startsAt: "2030-08-13T09:00:00Z", available: true }],
    });
  const { result, unmount } = await renderHook(() =>
    useAvailability({
      serviceId: "service-1",
      date: "2030-08-13",
      authenticatedRequest: request as AuthenticatedRequest,
    }),
  );
  await act(() => jest.advanceTimersByTime(150));
  expect(result.current.timeSlots).toHaveLength(1);
  await act(() => result.current.refreshAvailability());
  expect(result.current.timeSlots).toEqual([]);
  expect(result.current.isLoading).toBe(true);
  await unmount();
  expect(request.mock.calls[0][1].signal.aborted).toBe(true);
});

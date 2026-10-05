import { act, renderHook } from "@testing-library/react-native";
import { AppState, type AppStateStatus } from "react-native";
import { useFocusedQuery } from "../use-focused-query";
import { deferred } from "@/test-support/deferred";

let mockFocused = true;
jest.mock("expo-router", () => ({
  useFocusEffect: (effect: () => void) =>
    jest
      .requireActual<typeof import("react")>("react")
      .useEffect(
        () => (mockFocused ? effect() : undefined),
        [effect, mockFocused],
      ),
}));
let changeState: (state: AppStateStatus) => void;
const remove = jest.fn();
beforeEach(() => {
  jest.useFakeTimers();
  mockFocused = true;
  jest
    .spyOn(AppState, "addEventListener")
    .mockImplementation((_event, callback) => {
      changeState = callback;
      return { remove };
    });
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

it("refreshes staff changes, pauses in background and reloads on return", async () => {
  const query = jest.fn().mockResolvedValue({ value: "old" });
  const { result, unmount } = await renderHook(() => useFocusedQuery(query));
  expect(result.current.data).toEqual({ value: "old" });
  query.mockResolvedValue({ value: "edited by admin" });
  await act(() => jest.advanceTimersByTime(15_000));
  expect(result.current.data).toEqual({ value: "edited by admin" });
  await act(() => changeState("background"));
  await act(() => jest.advanceTimersByTime(30_000));
  expect(query).toHaveBeenCalledTimes(2);
  await act(() => changeState("active"));
  expect(query).toHaveBeenCalledTimes(3);
  await unmount();
  expect(remove).toHaveBeenCalled();
});

it("prevents overlapping reads and ignores late responses after background or blur", async () => {
  const pending = deferred<string>();
  const query = jest
    .fn()
    .mockReturnValueOnce(pending.promise)
    .mockResolvedValue("fresh");
  const { result, rerender } = await renderHook(() => useFocusedQuery(query));
  await act(() => jest.advanceTimersByTime(30_000));
  expect(query).toHaveBeenCalledTimes(1);
  await act(() => changeState("background"));
  expect(query.mock.calls[0][0].signal.aborted).toBe(true);
  await act(() => changeState("active"));
  await act(() => pending.resolve("stale"));
  expect(result.current.data).toBe("fresh");
  mockFocused = false;
  await rerender(undefined);
  await act(() => jest.advanceTimersByTime(30_000));
  expect(query).toHaveBeenCalledTimes(2);
  mockFocused = true;
  await rerender(undefined);
  expect(query).toHaveBeenCalledTimes(3);
});

it("recovers from errors and manual retry cancels an outstanding read", async () => {
  const query = jest
    .fn()
    .mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValue("recovered");
  const { result } = await renderHook(() => useFocusedQuery(query));
  expect(result.current.error?.message).toBe("offline");
  expect(result.current.isLoading).toBe(false);
  await act(() => result.current.refresh());
  expect(result.current.data).toBe("recovered");
  expect(result.current.error).toBeNull();
  const pending = deferred<string>();
  query.mockReturnValueOnce(pending.promise);
  await act(() => result.current.refresh());
  await act(() => result.current.refresh());
  await act(() => pending.resolve("obsolete"));
  expect(result.current.data).toBe("recovered");
});

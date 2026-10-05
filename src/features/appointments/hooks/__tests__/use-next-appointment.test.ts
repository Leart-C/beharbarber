import { act, renderHook } from "@testing-library/react-native";
import { useNextAppointment } from "../use-next-appointment";
import { remoteAppointment } from "@/test-support/appointment";
import { mapAppointment } from "../../mappers/map-appointment";

const mockAppointments = [
  mapAppointment({
    ...remoteAppointment,
    id: "later",
    startsAt: "2030-08-13T10:30:00Z",
  }),
  mapAppointment(remoteAppointment),
];
jest.mock("../use-appointments", () => ({
  useAppointments: () => ({ appointments: mockAppointments }),
}));

it("advances the next appointment as time passes without needing a server refresh", async () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2030-08-13T09:29:50Z"));
  try {
    const { result, unmount } = await renderHook(useNextAppointment);
    expect(result.current?.id).toBe("appointment-1");
    await act(() => jest.advanceTimersByTime(30_000));
    expect(result.current?.id).toBe("later");
    expect(mockAppointments[0].id).toBe("later");
    await unmount();
  } finally {
    jest.useRealTimers();
  }
});

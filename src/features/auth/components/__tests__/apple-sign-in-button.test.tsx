import { fireEvent, render } from "@testing-library/react-native";
import { Platform } from "react-native";

import { AppleSignInButton } from "../apple-sign-in-button";

jest.mock("expo-symbols", () => ({
  SymbolView: () => null,
}));

jest.mock("@/features/localization/hooks/use-translation", () => ({
  useTranslation: () => ({
    t: (key: string) => (key === "auth.apple" ? "Vazhdo me Apple" : key),
  }),
}));

describe("AppleSignInButton", () => {
  const originalOS = Platform.OS;

  afterEach(() => {
    Platform.OS = originalOS;
  });

  it("calls onPress when enabled", async () => {
    Platform.OS = "ios";
    const onPress = jest.fn();
    const screen = await render(<AppleSignInButton onPress={onPress} />);

    fireEvent.press(screen.getByRole("button", { name: "Vazhdo me Apple" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress while another sign-in is running", async () => {
    Platform.OS = "ios";
    const onPress = jest.fn();
    const screen = await render(
      <AppleSignInButton onPress={onPress} disabled />,
    );

    const button = screen.getByRole("button", { name: "Vazhdo me Apple" });
    fireEvent.press(button);

    expect(button.props.accessibilityState).toEqual({
      disabled: true,
      busy: false,
    });
    expect(onPress).not.toHaveBeenCalled();
  });

  it("is hidden on Android", async () => {
    Platform.OS = "android";
    const screen = await render(<AppleSignInButton onPress={jest.fn()} />);

    expect(screen.queryByRole("button")).toBeNull();
  });
});

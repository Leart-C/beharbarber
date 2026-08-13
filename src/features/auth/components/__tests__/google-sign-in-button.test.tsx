import { fireEvent, render } from "@testing-library/react-native";

import { GoogleSignInButton } from "../google-sign-in-button";

jest.mock("@/features/localization/hooks/use-translation", () => ({
  useTranslation: () => ({
    t: (key: string) => (key === "auth.google" ? "Vazhdo me Google" : key),
  }),
}));

describe("GoogleSignInButton", () => {
  it("calls onPress when enabled", async () => {
    const onPress = jest.fn();
    const screen = await render(<GoogleSignInButton onPress={onPress} />);

    fireEvent.press(screen.getByRole("button", { name: "Vazhdo me Google" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress while loading", async () => {
    const onPress = jest.fn();
    const screen = await render(<GoogleSignInButton onPress={onPress} isLoading />);

    const button = screen.getByRole("button", { name: "Vazhdo me Google" });
    fireEvent.press(button);

    expect(button.props.accessibilityState).toEqual({
      disabled: true,
      busy: true,
    });
    expect(onPress).not.toHaveBeenCalled();
  });
});

import type { IconProps } from "phosphor-react-native";
import {
  Circle,
  Path,
  Svg,
} from "react-native-svg";

export function StraightRazorIcon({
  color = "#FFFFFF",
  size = 28,
  style,
  testID,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      style={style}
      testID={testID}
    >
      <Path
        d="M35 166L119 92L142 114L77 199H35V166Z"
        stroke={color}
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M137 108C162 126 194 158 222 196C228 204 226 215 217 220C209 225 199 222 193 215L126 128"
        stroke={color}
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Circle
        cx="130"
        cy="111"
        r="10"
        fill={color}
      />
    </Svg>
  );
}
import { remToNumberPixels } from "@app/utils/remToPixels";
import { useTheme } from "styled-components/native";

export const theme = {
  color: {
    primary: "#4754F0",
    primaryLight: "#5965f1",
    default: "#0D0B22",
    white: "#ffffff",
    gray: "#797979",
    status: {
      danger: "#de2362",
      dangerLight: "#fbe9ef",
      success: "#449b18",
      successLight: "#ecf5e7"
    },
    darkBlue: "#1C2160",
    lightBlue: "#F5F6FF",
    lightGray: "#FAFAFA",
    mediumGray: "#efeff0",
    red: {
      light: "#f15965",
      primary: "#F04754",
    },
    party: {
      democrat: "#00AEF3",
      republican: "#E81B23",
      independent: "#5965f1",
      other: '#797979'
    },
  },
  space: {
    xxxSmall: 2,
    xxSmall: 4,
    xSmall: 8,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 28,
    xxLarge: 36,
    xxxLarge: 48,
    xxxxLarge: 72,
    xxxxxLarge: 94,
  },
  borderRadius: {
    sharp: 0,
    pill: remToNumberPixels("20rem"),
    default: 6,
    circle: (size: number) => size / 2,
    card: 24,
  },
  fontSize: {
    xxSmall: 10,
    xSmall: 12,
    small: 14,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 36,
    xxxLarge: 48,
  },
};

export type Theme = typeof theme;

export function useDemocraseeTheme() {
  return useTheme();
}
import { Platform } from "react-native";

function remToPixels(
  rem_str: string,
  baseFontSize?: number,
  returnNumber?: true
): number;
function remToPixels(
  rem_str: string,
  baseFontSize?: number,
  returnNumber?: false
): string;
function remToPixels(
  rem_str: string,
  baseFontSize: number = 16,
  returnNumber?: boolean
) {
  const rem = parseFloat(rem_str.replace("rem", ""));

  return returnNumber ? rem * baseFontSize : `${rem * baseFontSize}px`;
}

export function remToNumberPixels(
  rem_str: string,
  baseFontSize: number = 16
): number {
  return remToPixels(rem_str, baseFontSize, true);
}

export default remToPixels;
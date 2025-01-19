import { Theme } from "@app/theme";
import React from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

export type FlexboxProperties = Pick<
  React.CSSProperties,
  | "flex"
  | "alignItems"
  | "justifyContent"
  | "flexDirection"
  | "marginLeft"
  | "marginBottom"
  | "marginTop"
  | "marginRight"
  | "flexWrap"
  | "overflow"
  | "height"
  | "maxHeight"
  | "width"
  | "display"
  | "maxWidth"
  | "margin"
  | "justifySelf"
  | "position"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "backgroundColor"
> & {
    paddingVertical?: string | number;
    paddingHorizontal?: string | number;
    style?: StyleProp<ViewStyle>;
    gap?: keyof Theme['space']
};
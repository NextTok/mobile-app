import styled from "styled-components/native";
import { TextStyleProps } from "./Text.types";
import createStyleProp from "@app/utils/createStyleProp";
import { theme } from "@app/theme";

function getColor(type: TextStyleProps["type"] = "default") {
  switch (type) {
    case "helper":
      return theme.color.gray;
    case "primary":
      return theme.color.primary;
    case "error":
      return theme.color.status.danger;
    case "white":
      return theme.color.white;
    case "success":
      return theme.color.status.success;
    default:
      return theme.color.default;
  }
}

export const Text = styled.Text<TextStyleProps>`
  ${({
    fontFamily,
    fontSize = "medium",
    type = "default",
    theme,
    textAlign,
  }) => `
        ${createStyleProp("font-family", fontFamily ?? "RobotoRegular")}
        ${createStyleProp("font-size", theme.fontSize[fontSize])}
        ${createStyleProp("text-align", textAlign)}
        ${createStyleProp("color", getColor(type))}
    `}
`;

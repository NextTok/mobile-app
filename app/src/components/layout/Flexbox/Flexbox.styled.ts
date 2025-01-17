import styled from "styled-components/native";
import createStyleProp from "@app/utils/createStyleProp";
import { FlexboxProperties } from "./Flexbox.types";

export const FlexboxView = styled.View<FlexboxProperties>`
  ${({
    flex,
    alignItems,
    justifyContent,
    flexDirection,
    paddingVertical,
    paddingHorizontal,
    marginLeft,
    marginTop,
    marginBottom,
    flexWrap,
    overflow,
    height,
    maxHeight,
    width,
    display,
    marginRight,
    maxWidth,
    margin,
    justifySelf,
  }) => `
        ${createStyleProp("padding-top", paddingVertical)}
        ${createStyleProp("padding-bottom", paddingVertical)}
        ${createStyleProp("padding-left", paddingHorizontal)}
        ${createStyleProp("padding-right", paddingHorizontal)}
        ${createStyleProp("display", display ?? "flex")}
        ${createStyleProp("flex", flex, true)}
        ${createStyleProp("flex-direction", flexDirection)}
        ${createStyleProp("justify-content", justifyContent)}
        ${createStyleProp("justify-self", justifySelf)}
        ${createStyleProp("align-items", alignItems)}
        ${createStyleProp("margin-left", marginLeft)}
        ${createStyleProp("margin-top", marginTop)}
        ${createStyleProp("margin-bottom", marginBottom)}
        ${createStyleProp("margin-right", marginRight)}
        ${createStyleProp("flex-wrap", flexWrap)}
        ${createStyleProp("overflow", overflow)}
        ${createStyleProp("height", height)}
        ${createStyleProp("width", width)}
        ${createStyleProp("margin", margin)}
        ${createStyleProp("max-height", maxHeight)}
        ${createStyleProp("max-width", maxWidth)}
    `}
`;
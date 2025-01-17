import React from "react";
import * as Styled from "./Flexbox.styled";
import { FlexboxProperties } from "./Flexbox.types";
import { useDemocraseeTheme } from "@app/theme";

export type FlexboxProps<
  Props extends Record<string, any> = Record<string, any>
> = FlexboxProperties & {
  horizontal?: boolean;
  vertical?: boolean;
  wrap?: boolean;
  as?: React.ComponentType<
    FlexboxProperties & Omit<Props, keyof FlexboxProperties>
  >;
  children?: React.ReactNode;
} & Omit<Props, keyof FlexboxProperties>;

function Flexbox<Props extends Record<string, any>>({
  children,
  flex,
  alignItems,
  justifyContent,
  horizontal,
  flexDirection,
  vertical,
  paddingHorizontal,
  paddingVertical,
  marginLeft,
  marginBottom,
  marginTop,
  marginRight,
  flexWrap,
  wrap,
  overflow,
  height,
  as,
  maxHeight,
  width,
  style,
  display,
  maxWidth,
  margin,
  justifySelf,
  gap,
  ...restProps
}: FlexboxProps<Props>) {
  const theme = useDemocraseeTheme();
  return (
    <Styled.FlexboxView<React.ComponentType<any>>
      flex={flex}
      alignItems={alignItems}
      justifyContent={justifyContent}
      justifySelf={justifySelf}
      flexDirection={horizontal ? `row` : vertical ? `column` : flexDirection}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      marginLeft={marginLeft}
      marginBottom={marginBottom}
      marginTop={marginTop}
      marginRight={marginRight}
      flexWrap={wrap ? "wrap" : flexWrap}
      overflow={overflow}
      height={height}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      as={as}
      width={width}
      display={display}
      margin={margin}
      style={[style, { gap: gap ? theme.space[gap] : undefined }]}
      {...restProps}
    >
      {children}
    </Styled.FlexboxView>
  );
}

export default Flexbox;
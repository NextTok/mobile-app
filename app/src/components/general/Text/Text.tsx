import * as Styled from "./Text.styled";
import { TextProps } from "./Text.types";

export const Text = ({ children, textAlign, ...restProps }: TextProps) => {
  return <Styled.Text {...restProps} textAlign={textAlign}>{children}</Styled.Text>;
};

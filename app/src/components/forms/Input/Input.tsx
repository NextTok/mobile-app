import React from "react";
import { StyleProp, TextInput, TextInputProps, ViewStyle } from "react-native";
import * as Styled from "./Input.styled";

export interface InputProps extends TextInputProps {
  label: string;
  ref?: React.LegacyRef<TextInput>;
  containerStyles?: StyleProp<ViewStyle>
}

function InputForwardRef(
  { label, containerStyles, ...restProps }: InputProps,
  ref: React.LegacyRef<TextInput>
) {
  return (
      <Styled.TextInput {...restProps} aria-label={label} ref={ref} />
  );
}

export const Input = React.forwardRef(InputForwardRef) as (
  props: InputProps
) => JSX.Element;
import Flexbox from "@app/components/layout/Flexbox";
import { useFormikContext } from "formik";
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInputFocusEventData,
  ViewStyle,
} from "react-native";
import get from "lodash/get";
import { theme } from "@app/theme";
import { Input, InputProps } from "@app/components/forms/Input";

export interface InputFormikProps extends InputProps {
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
  trim?: boolean;
  error?: string
}

export function InputFormik({
  name,
  onChangeText,
  onBlur,
  containerStyle,
  trim = false,
  error: parentError,
  ...restProps
}: InputFormikProps) {
  const { handleChange, handleBlur, values, errors } =
    useFormikContext<Record<string, string>>();

  const handleInputChangeText = (text: string) => {
    const formattedText = trim ? text.trim() : text;

    if (onChangeText) onChangeText(formattedText);

    handleChange(name)(formattedText);
  };

  const handleInputBlur = (
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    if (onBlur) onBlur(e);

    handleBlur(name)(e);
  };

  const error = get(errors, name);

  return (
    <Flexbox flexDirection="column" gap="xSmall" style={containerStyle}>
      <Input
        {...restProps}
        value={values[name]}
        onChangeText={handleInputChangeText}
        onBlur={handleInputBlur}
        testID={name}
      />
      {(error || parentError) && <Text>{parentError || error}</Text>}
    </Flexbox>
  );
}
import { theme } from "@app/theme";
import { useFormikContext } from "formik";
import {
  ActivityIndicator,
  Button,
  ButtonProps,
  GestureResponderEvent,
} from "react-native";

export interface SubmitButtonProps extends ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void | Promise<void>) | undefined;
}

export function SubmitButton({ onPress, ...restProps }: SubmitButtonProps) {
  const { submitForm, isSubmitting } = useFormikContext();

  const handlePress = async (event: GestureResponderEvent) => {
    if (onPress) await onPress(event);

    await submitForm();
  };

  return (
    <Button
      onPress={handlePress}
    //   rightElement={
    //     isSubmitting && (
    //       <ActivityIndicator size="small" color={theme.color.white} />
    //     )
    //   }
      {...restProps}
    />
  );
}
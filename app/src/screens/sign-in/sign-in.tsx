import { InputFormik } from "@app/components/formik/InputFormik";
import { SubmitButton } from "@app/components/formik/SubmitButton";
import Flexbox from "@app/components/layout/Flexbox";
import { useAuth } from "@app/providers/AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";

interface FormValues {
  handle: string;
  server: string;
}

const Schema = Yup.object<FormValues>().shape({
  handle: Yup.string().required("Please enter your bluesky handle"),
  server: Yup.string().required("Please enter your bluesky server"),
});

export function SignInScreen() {
  const { signIn } = useAuth();

  const handleSubmit = async (values: FormValues) => {
    await signIn(`${values.handle}.${values.server}`);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ handle: "", server: "bsky.social" }}
      validationSchema={Schema}
    >
      <Flexbox
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Flexbox flexDirection="column" gap="xSmall" testID="signup-password" width="100%">
          <InputFormik name="server" label="Server" autoCapitalize="none" />
          <InputFormik name="handle" label="Handle" autoCapitalize="none" />
        </Flexbox>
        <SubmitButton title="Login" />
      </Flexbox>
    </Formik>
  );
}

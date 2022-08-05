import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("This field is required!")
    .min(3, "Field should have at least 3 letters!")
    .max(31, "Field should be up to 31 letters long!"),
  lastName: Yup.string()
    .required("This field is required!")
    .min(3, "Field should have at least 3 letters!")
    .max(31, "Field should be up to 31 letters long!"),
  username: Yup.string().required("This field is required!"),
  email: Yup.string()
    .required("This field is required!")
    .email("Invalid email!"),
  password: Yup.string()
    .required("This field is required!")
    .min(6, "Field should have at least 6 letters!")
    .max(1024, "Field should be up to 1024 letters long!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords did not match!",
  ),
});

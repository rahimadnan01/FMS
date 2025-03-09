import * as Yup from "yup";

export const loginSchema = Yup.object({
  password: Yup.string()
    .required("password is required"),
});

export const registrationSchema = Yup.object({
  username: Yup.string()
    .required("username is required"),
  email: Yup.string()
    .required("email is required"),
  password: Yup.string()
    .required("password is required"),
});

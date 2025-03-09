import * as Yup from "yup";

export const loginSchema = Yup.object({
  password: Yup.string()
    .required("password is required"),
});

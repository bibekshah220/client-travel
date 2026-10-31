import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  phone: yup.string().optional(),
  subject: yup.string().required("subject is required"),
  message: yup
    .string()
    .min(10, "message must be at least 10 characters")
    .required("message is required"),
});

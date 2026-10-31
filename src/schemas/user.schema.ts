import * as yup from "yup";
import { Gender } from "../@types/global.types";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024; // matches the 5mb multer limit
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/avif",
];

export const profileSchema = yup.object({
  first_name: yup.string().trim().required("first name is required"),
  last_name: yup.string().trim().required("last name is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9+\-\s]*$/, "phone can only contain digits, + and -")
    .max(15, "phone must be 15 characters or fewer")
    .optional(),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), "select a valid option")
    .required("gender is required"),
  profile_image: yup
    .mixed<FileList>()
    .test("size", "image must be 5MB or smaller", (files) => {
      const file = files?.[0];
      return !file || file.size <= MAX_AVATAR_BYTES;
    })
    .test("type", "only png, jpg, webp, svg, gif or avif", (files) => {
      const file = files?.[0];
      return !file || ALLOWED_TYPES.includes(file.type);
    })
    .optional(),
});

export const passwordSchema = yup.object({
  current_password: yup.string().required("current password is required"),
  new_password: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      "password must contain at least one letter, one number, and one special character"
    )
    .notOneOf(
      [yup.ref("current_password")],
      "new password must be different from the current one"
    )
    .required("new password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "passwords do not match")
    .required("retype your new password"),
});

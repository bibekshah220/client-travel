import type { Gender } from "./global.types";

export type IUpdateProfile = {
  first_name: string;
  last_name: string;
  phone?: string;
  gender: Gender;
  profile_image?: FileList;
};

export type IChangePassword = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

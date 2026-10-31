/* eslint-disable @typescript-eslint/no-explicit-any */
import api from ".";
import type { IChangePassword, IUpdateProfile } from "../@types/user.types";

//* update own profile — multipart because the avatar rides along
export const updateProfile = async ({
  user_id,
  data,
}: {
  user_id: string;
  data: IUpdateProfile;
}) => {
  try {
    const form = new FormData();
    form.append("first_name", data.first_name);
    form.append("last_name", data.last_name);
    form.append("phone", data.phone ?? "");
    form.append("gender", data.gender);

    if (data.profile_image?.[0]) {
      form.append("profile_image", data.profile_image[0]);
    }

    const response = await api.put(`/user/${user_id}`, form);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//* change own password
export const changePassword = async ({
  user_id,
  data,
}: {
  user_id: string;
  data: IChangePassword;
}) => {
  try {
    const response = await api.put(`/user/${user_id}/password`, {
      current_password: data.current_password,
      new_password: data.new_password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

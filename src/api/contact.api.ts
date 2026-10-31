/* eslint-disable @typescript-eslint/no-explicit-any */
import api from ".";
import type { IContact } from "../@types/contact.types";

export const submitContact = async (data: IContact) => {
  try {
    const response = await api.post("/contact", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

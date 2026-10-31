/* eslint-disable @typescript-eslint/no-explicit-any */
import api from ".";

export const getContent = async () => {
  try {
    const response = await api.get("/content");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

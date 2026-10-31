/* eslint-disable @typescript-eslint/no-explicit-any */
import api from ".";
import type { IBookPackage, } from "../@types/package.types";

export const bookPackage = async (data:IBookPackage) => {
  try {
    const response = await api.post("/booking",data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//* bookings of the logged-in user
export const getMyBookings = async () => {
  try {
    const response = await api.get("/booking/my");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//* cancel a booking (frees the seats back onto the package)
export const cancelBooking = async (id: string) => {
  try {
    const response = await api.delete(`/booking/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

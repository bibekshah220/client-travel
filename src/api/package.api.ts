/* eslint-disable @typescript-eslint/no-explicit-any */

import api from ".";

export type IPackageQuery = {
  query?: string;
  type?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  limit?: number;
};

export const getPopularPackage = async (params: IPackageQuery = {}) => {
  try {
    const response = await api.get("/package", { params });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getPackageById = async (id:string) => {
  try {
    const response = await api.get(`/package/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

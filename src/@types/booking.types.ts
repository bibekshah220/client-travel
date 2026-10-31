import type { IResponse } from "./global.types";
import type { IPackageResponse } from "./package.types";

export type IBookingResponse = IResponse & {
  full_name: string;
  phone: string;
  total_person: number;
  total_price: number;
  tour_package: IPackageResponse | null;
};

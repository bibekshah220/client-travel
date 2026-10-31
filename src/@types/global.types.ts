export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHERS = "OTHERS",
}

export enum PACKAGE_COST_TYPE {
  PER_PERSON= "PER_PERSON",
  PER_DAY= "PER_DAY",
}


export type IResponse = {
    _id: string,
    createdAt: string,
    updatedAt:string
}

export type IImage = {
    public_id: string;
    path: string;
}
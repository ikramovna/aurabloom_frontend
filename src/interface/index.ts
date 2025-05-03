/* eslint-disable @typescript-eslint/no-explicit-any */
export interface  IRegisterdata {
    id:number,
    full_name: string,
    email: string,
    username: string,
    password: string
}
export interface  IVerifyemail {
    email: string,
    activate_code: number
}
export interface  ICategory {
    id: number | null,
    name?: string
    parent: number | null
    data?: undefined;
  success:boolean;
  category: number | any; 
}
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
// import { GENDER } from "./constants";

import { ICategory } from "../../interface";

export namespace IEntity {
  export interface User {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    username: string;
    bio: string;
    gender: string;
    telegram: string;
    instagram: string;
    facebook: string;
    address: {
      id: number;
      region: string;
      district: string;
      mahalla: string;
      house: string;
    };
    image: string;
    is_master: boolean;
    data?: undefined;
  }
  export interface Tokens {
    email: any;
    access: string;
    refresh: string;
  }
}
export namespace IForm {
  export interface Login {
    username: string;
    password: string;
  }
  export interface Region {
    id: number;
    name: string;
    data?: undefined;
  }
  export interface ActiveCodes {
    email: string;
    activate_code?: number | undefined;
  }
  export interface Register {
    id: number;
    full_name: string;
    email: string;
    username: string;
    password: string;
    activate_code?: number | undefined;
    is_master: string | null;
  }
  export interface Register2steps {
    phone: string;
    gender: string;
    address: {
      region?: number | undefined;
      district?: number | undefined;
      mahalla?: number | undefined;
      house: string;
    };
  }
  export interface Verification {
    email: string;
    data?: undefined;
  }
  export interface CheckEmail {
    email: string;
  }
  export interface PostsApi {
    id: number | null;
    name: string;
    price: string;
    description: string;
    category: ICategory | any;
    image: string;
	duration: string;
    data?: undefined;
	filteredPosts?: undefined;
	user: {
    id:number | null;
		full_name: string;
		address: {
		  id: number | null;
		  region: string;
		  district: string;
		  mahalla: string;
		  house: string;
		},
		image: string;
	  },
	  is_like: string;
	  is_saved: string;
    favorites_count:number | null;
  }
  export interface Checkpassword {
    email: string;
    code: string;
  }
  export interface MasterFreeTime {
    date:string;
    service_ids:number; 
    free_times:[]
  }
  export interface MasterUpdateTime {
    id: number;
    day: number;
    start_time: string;
    end_time: string;
  }
  export interface ResetPassword {
    email: string;
    code: string;
    new_password: string;
    confirm_password: string;
    detail: string;
  }
  
  export interface BookingUserMaster {
    id: number;
    date: string;
    time: string;
    service: {
        id: number;
        name: string;
        duration: string;
        price: string;
      }[] 
    status: string;
    user: {
        id: number;
        full_name: string;
        phone: string;
        address: {
            id: number;
            region: string;
            district: string;
            mahalla: string;
            house: string;
        };
        image: string;
        is_master:boolean;
    };
}

export interface UpdateStatusBooking {
  id:number;
  status:string;
}


  export interface BookingsMy {
    id: number ;
    date: string;
    time: string;
    service: number;
    status: string;
    user: {
      full_name: string;
      address: {
        id: 1;
        region: string;
        district: string;
        mahalla: string;
        house: string;
      },
      image: string;
      data?: undefined;
    }
  }
  
  export interface CreateService {
    name:string,
    price:string,
    duration:string,
    description:string,
    category:number,
    image:string
  }

  export interface PostBooking {
    service_ids: number[],
    time:string,
    date:string,
  }

  export interface Likes {
    service:number | null,
    like:boolean;
  }

  export interface getLikesPosts {
    id: number,
    service: number,
    saved: boolean
  }
  export interface Bookmarks {
    service:number | null,
    saved:boolean;
  }

  export interface UserProfil {
    first_name?: string;
    last_name?: string;
    birthday?: string;
    gender?: string;
    phone?: string;
    image: string;
    balance: string;
    email: string;
    job?: string;
    username: string;
    about: string;
    is_active: boolean;
    is_spiker: boolean;
  }

  export interface WorkingTime {
    id:number;
    day:string;
    start_time:string;
    end_time:string;
  }
  export interface UpdateTime {
    day:string;
    start_time:string;
    end_time:string;
  }
  export interface PostWorkingTimes {
    id:number;
    day:number;
    start_time:string;
    end_time:string;
    key:number;
  }
}

export interface IToken {
  access: string;
  refresh: string;
}

export namespace IApi {
  export namespace Register {
    export interface Request extends IForm.Register {}
    export interface Response extends IForm.Register {}
  }
  export namespace Verification {
    export interface Request extends IForm.Verification {}
    export interface Response extends IForm.Verification {}
  }

  export namespace WorkingTime {
    export interface Request extends IForm.WorkingTime {}
    export interface Response extends IForm.WorkingTime {}
  }

  export namespace PostBooking {
    export interface Request extends IForm.PostBooking {}
    export interface Response extends IForm.PostBooking {}
  }
  
  export namespace UpdateStatusBooking {
    export interface Request  {status:string;}
    export interface Response extends IForm.UpdateStatusBooking {}
  }

  export namespace getLikesPost {
    export interface Response extends IForm.getLikesPosts {}
  }
  export namespace Likes {
    export interface Request extends IForm.Likes {}
    export interface Response {
      id: number;
      service: number;
      like: boolean;
      likes_count: number; 
      message: string;
    }
  }
  export namespace Bookmarks {
    export interface Request extends IForm.Bookmarks {}
    export interface Response {
      id: number;
      service: number;
      saved: boolean;
    }
  }

  export namespace BookingUserMaster {
    export interface Request extends IForm.BookingUserMaster {}
    export interface Response extends IForm.BookingUserMaster {}
  }

  export namespace UpdateTime {
    export interface Request extends IForm.UpdateTime {}
    export interface Response extends IForm.UpdateTime {}
  }

  export namespace PostWorkingTimes {
    export interface Request extends IForm.PostWorkingTimes {}
    export interface Response extends IForm.PostWorkingTimes {}
  }

  export namespace CreateService {
    export interface Request extends IForm.CreateService {}
    export interface Response extends IForm.PostsApi {}
  }

  export namespace ResetPasswords {
    export interface Request extends IForm.ResetPassword {}
    export interface Response extends IForm.ResetPassword {}
  }
  export namespace Register2steps {
    export interface Request extends IForm.Register2steps {}
    export interface Response extends IForm.Register2steps {}
  }
  export namespace ActiveCodes {
    export interface Request extends IForm.ActiveCodes {}
    export interface Response {
      access_token: string;
      refresh_token: string;
    }
  }
  export namespace Profile {
    export interface Request {}
    export interface Response extends IEntity.User {}
  }
  export namespace Login {
    export interface Request extends IForm.Login {}
    export interface Response extends IToken {}
  }
  export namespace CheckEmail {
    export type Request = {
      email: string;
    };
  }
  export namespace ResetEmail {
    export type Request = {
      email: string;
    };
  }
  export namespace ResetPassword {
    export type Request = {
      email: string;
      code: string;
      new_password: string;
      confirm_password: string;
    };
  }
  export namespace Checkpassword {
    export type Request = {
      email: string;
      code: string;
    };
  }

  export namespace ProfileUpdate {
    export type Request = {
      first_name?: string;
      email?: string;
      username?:string;
      gender?: string;
      image?:string;
    };

    export type Response = {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      gender: string;
      birthdate: string;
    };
  }
  export namespace EditProfil {
    export type Request = {
      first_name?: string;
      last_name?: string;
      phone?: string;
      image?: string;
      balance?: string;
      email?: string;
      username?: string;
      gender?: string;
      job?: string;
      birthday?: string;
      about?: string;
      is_active?: boolean;
      is_spiker?: boolean;
    };
  }
}

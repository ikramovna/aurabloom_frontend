/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { IApi,  IForm } from "./types";
import { BASE_URL } from "../../config";
import { ICategory } from "../../interface";

export const Register = ( body : IApi.Register.Request) => axios.post<IApi.Register.Response>(`${BASE_URL}/v1/users/register`,body);
export const Register2step = (body: IApi.Register2steps.Request) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
        'Content-Type': 'application/json' // Assuming JSON is being sent in the body
    };

    return axios.post<IApi.Register2steps.Response>(
        `${BASE_URL}/v1/users/register-step2`,
        body,
        { headers }
    );
};
export const ActiveCode = ( body : IApi.ActiveCodes.Request) => axios.post<IApi.ActiveCodes.Response>(`${BASE_URL}/v1/users/register-activate-code`,body);
export const Login = ( body : IApi.Login.Request) => axios.post<IApi.Login.Response>(`${BASE_URL}/v1/users/login`,body)
export const ResetPassword = ( body : IApi.Verification.Request) => axios.post<IApi.Verification.Response>(`${BASE_URL}/v1/users/reset-password`,body);
export const ResetPasswordConfirm = ( body : IApi.ResetPasswords.Request) => axios.post<IApi.ResetPasswords.Response>(`${BASE_URL}/v1/users/reset-password-confirm`,body);
export const Regions = () => axios.get<IForm.Region[]>(`${BASE_URL}/v1/region`)
export const SecondRegions = (body: IForm.Region) => axios.get<IForm.Region[]>(`${BASE_URL}/v1/district?region_id=${body}`)
export const Mahalla = (body: IForm.Region) => axios.get<IForm.Region[]>(`${BASE_URL}/v1/mahalla?district_id=${body}`)
export const UserProfil = () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
        'Content-Type': 'application/json' // Assuming JSON is being sent in the body
    };
    
    return axios.get<IApi.Profile.Response>(
        `${BASE_URL}/v1/users/profile`,
        { headers }
        );
    };
    export const UserUpdateProfile = (body:any) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
    
        return axios.put<IApi.ProfileUpdate.Response>(
            `${BASE_URL}/v1/users/profile`,
            body,
            { headers }
        );
    };

    export const BookingMy = (body:any) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json' // Assuming JSON is being sent in the body
        };
        
        return axios.get<IForm.BookingsMy[]>(
            `${BASE_URL}/v1/booking/my?date=${body}`,
            { headers },
            // {body:}
            );
        };

    export const BookingsUserMaster = (body:any) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
        };
        
        return axios.get<IApi.BookingUserMaster.Response[]>(
            `${BASE_URL}/v1/booking/my`,
            { 
                params: body,
                headers: headers
            }
            );
        };

        export const UpdateStatus = (body: IApi.UpdateStatusBooking.Request,id:any) => {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            };
        
            return axios.put<IApi.UpdateStatusBooking.Response>(
                `${BASE_URL}/v1/booking/${id}`,
                body,
                { headers }
            );
        };   
    
        
export const getallCategory = () => axios.get<ICategory[]>(`${BASE_URL}/v1/category`)

export const AddService = (body: IApi.CreateService.Request) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };

    return axios.post<IApi.CreateService.Response>(
        `${BASE_URL}/v1/service`,
        body,
        { headers }
    );
};
export const UpdateService = (body: IApi.CreateService.Request,id:number) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`
    };

    return axios.put<IApi.CreateService.Response>(
        `${BASE_URL}/v1/service/${id}`,
        body,
        { headers }
    );
};  
export const DeleteService = (id:number) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`
    };

    return axios.delete(
        `${BASE_URL}/v1/service/${id}`,
        { headers }
    );
};  
export const Userservices = (body:number) => axios.get<IForm.PostsApi[]>(`${BASE_URL}/v1/service/list?id=${body}`)
export const UserPosts = (body:number) => axios.get<IForm.PostsApi[]>(`${BASE_URL}/v1/service/list?user_id=${body}`,{headers:{Authorization:`Bearer ${localStorage.getItem("access")}`}})
export const UserWorkingDay = () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };
    
    return axios.get<IForm.WorkingTime[]>(
        `${BASE_URL}/v1/working/day`,
        { headers },
        // {body:}
        );
    };

    export const PostUserWorkingTimes = (body:any) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
        };
        
        return axios.post<IApi.PostWorkingTimes.Response[]>(
            `${BASE_URL}/v1/working/time`,
            {times:body},
            { headers }
            );
        };
        

export const getUpdatedTimes = () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };
    
    return axios.get<IForm.MasterUpdateTime[]>(
        `${BASE_URL}/v1/working/time`,
        { headers },
        // {body:}
        );
    };
    export const UpdateTimes = (body: IApi.UpdateTime.Request,id:number) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
    
        return axios.put<IApi.UpdateTime.Response>(
            `${BASE_URL}/v1/working/time/${id}`,
            body,
            { headers }
        );
    };



export const getFreeTimemaster = (body:any,id:any) => axios.get<IForm.MasterFreeTime>(`${BASE_URL}/v1/booking/time?date=${body}&service_ids=${id}`)
export const PostBookings = (body: IApi.PostBooking.Request) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };

    return axios.post<any>(
        `${BASE_URL}/v1/booking`,
        body,
        { headers }
    );
};

export const NewPostss = () => {
    // Tokeni localStorage'dan al
    const token = localStorage.getItem("access");
    
    // Headerları belirle
    const headers: any = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    
    // GET isteğini yap ve sonucu döndür
    return axios.get<IForm.PostsApi[]>(`${BASE_URL}/v1/service/list`, {
        headers: headers
    });
};
export const Like = (body: IApi.Likes.Request) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };

    return axios.post<IApi.Likes.Response>(
        `${BASE_URL}/v1/favorite`,
        body,
        { headers }
    );
};

export const getLikes = () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };
    
    return axios.get<IApi.getLikesPost.Response[]>(
        `${BASE_URL}/v1/favorite`,
        { headers },
        // {body:}
        );
    };
    export const getSave = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
        };
        
        return axios.get<IApi.getLikesPost.Response[]>(
            `${BASE_URL}/v1/saved`,
            { headers },
            // {body:}
            );
        };

export const Bookmarks = (body: IApi.Bookmarks.Request) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };

    return axios.post<IApi.Bookmarks.Response>(
        `${BASE_URL}/v1/saved`,
        body,
        { headers }
    );
};
export const CategoryPosts = (body:number) => axios.get<IForm.PostsApi[]>(`${BASE_URL}/v1/service/list?category_id=${body}`)

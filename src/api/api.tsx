import { BASE_URL } from "../config";
import axios from "axios";
import { IRegisterdata, IVerifyemail} from "../interface";
import { Mahalla, Regions, SecondRegions, UserProfil } from "../modules/auth/api";
import { Types } from "../modules/auth";

export const registerData = async (body: IRegisterdata) => {
      try {
        const {data} = await axios.post(`${BASE_URL}/v1/users/register`,body);
        return {data,success:true} 
      } catch (error) {
        console.log(error);
        return {success:false}
      }  
}
export const verifyemail = async (body: IVerifyemail) => {
    try {
      const {data} = await axios.post(`${BASE_URL}/v1/users/register-activate-code`,body);
      return {data,success:true} 
    } catch (error) {
      console.log(error);
      return {success:false}
    }  
}

export const getCategory = async () => {
    try {
        const {data} = await axios.get(`${BASE_URL}/v1/category`)
        return {data,success:true}
    } catch (error) {
        console.log(error);
        return {success:false}
    }
}
export const getRegions = async () => {
  try {
    const {data} = await Regions()
    console.log(data);
    return {data,success:true}
  } catch (error) {
    console.log(error);
    return {success:false}
  }
} 
export const getDistrict = async (body:Types.IForm.Region) => {
  try {
    const {data} = await SecondRegions(body)
    console.log(data);
    return {data,success:true}
  } catch (error) {
    console.log(error);
    return {success:false}
  }
}
export const getMahalla = async (body:Types.IForm.Region) => {
  try {
    const {data} = await Mahalla(body)
    console.log(data);
    return {data,success:true}
  } catch (error) {
    console.log(error);
    return {success:false}
    
  }
}

export const getUserProfile = async () => {
  try {
    const {data} = await UserProfil()
    console.log(data);
    return {data,success:true}
    
  } catch (error) {
    console.log(error);
    return {success:false}    
  }
}
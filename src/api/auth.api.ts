
import type { LoginFormData, RegisterFormData } from "../validator/auth.schema";
import axiosInstance from "./axios";

export interface User{
    id: string;
    name: string
    email:string
}
export interface LoginResponse{
    user:User;
    message: string
}

export interface RegisterReponse{
    message: string
    otp: string
}

export const AuthApi = {

    register: async(formData: RegisterFormData): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/auth/register', formData);
        return response.data
    },

    otpVerification: async(email: string,otp: string): Promise<{message: string}>=>{
        const response = await axiosInstance.post('/auth/verifyotp', {email,otp});
        return response.data
    },

    resendOtp: async(email: string): Promise<{message: string}>=>{
        const response = await axiosInstance.post('/auth/resendOtp', {email});
        return response.data
    },

    login: async(data: LoginFormData): Promise<LoginResponse>=>{
        const response = await axiosInstance.post('/auth/login', data)
        return response.data
    },

    getMe: async(): Promise<User>=>{
        const response = await axiosInstance.get('/auth/health')
        return response.data
    },

     logout: async():Promise<{message: string}> => {
        const res = await axiosInstance.post("/auth/logout");
        return res.data;
    },
}
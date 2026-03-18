import type { LoginFormData } from "../pages/Login";
import type { FormData } from "../pages/Register";
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

export const AuthApi = {

    register: async(formData: FormData): Promise<{message:string}>=>{
        const response = await axiosInstance.post('/auth/register', formData);
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
import axios, { type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { logout } from "../app/slice/authSlice";
import { store } from "../app/store";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig)=>{
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response?.status == 401){
            console.log("dispatch logout")
            store.dispatch(logout())
            return Promise.reject(error)
        }
        const message = error.response.data.message || "Something went wrong!"
        toast.error(message)
        return Promise.reject(error)
    }
)

export default axiosInstance;
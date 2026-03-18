import { AuthApi } from "../api/auth.api";
import toast from "react-hot-toast";

export const useAuth = () => {
  const register = async (data: any) => {
    try {
      const res = await AuthApi.register(data);
      toast.success(res.message);
      return res;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Register failed");
      throw err;
    }
  };

  const login = async (data: any) => {
    try {
      const res = await AuthApi.login(data);
      toast.success(res.message);
      return res;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
      throw err;
    }
  };

  return { register, login };
};
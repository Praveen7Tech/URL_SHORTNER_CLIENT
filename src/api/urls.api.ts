import axiosInstance from "./axios";

export const UrlApi = {
  createShortUrl: async (data: { url: string }) => {
    const res = await axiosInstance.post("/urls/shorten", data);
    return res.data;
  }
 
};
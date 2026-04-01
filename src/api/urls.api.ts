import axiosInstance from "./axios";

export interface History{
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export interface LinkHistory{
  history: History[],
  totalPages: number
}

export const UrlApi = {
  createShortUrl: async (data: { url: string }) => {
    const res = await axiosInstance.post("/urls/shorten", data);
    return res.data;
  },

  LinkHistory: async(page: number, limit: number): Promise<LinkHistory>=>{
    const response = await axiosInstance.get("/urls/history",{
      params:{page,limit}
    })
    return response.data
  }
 
};
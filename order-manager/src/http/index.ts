import Axios, { type AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_KEY

export const httpClient: AxiosInstance = Axios.create({
    baseURL,
    headers: {
        accept: "application/json",
        "content-type": "application/json"
    }
})
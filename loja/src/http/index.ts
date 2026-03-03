import Axios, { type AxiosInstance } from "axios";

const resourceUrl = import.meta.env.VITE_API_KEY;

export const httpClient: AxiosInstance = Axios.create({
    baseURL: resourceUrl,
    headers: {
        accept: "application/json",
        "content-type": "application/json"
    }
})
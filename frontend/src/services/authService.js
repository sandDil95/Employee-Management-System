import { Axios } from "axios";
import axiosInstance from "../api/axiosInstance";

export const loginRequest = async(data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
}

export const register = async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
}
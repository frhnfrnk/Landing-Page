import axiosInstance from "@/lib/axios";
import { AddBudaya } from "@/utils/types/addBudaya";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchAllBudaya = async () => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/budaya`);
  return response.data;
};

const addBudaya = async (budaya: AddBudaya) => {
  const response = await axiosInstance.post(`${LOCAL_API_URL}/budaya`, budaya);
  return response.data;
};

const deleteBudaya = async (id: string) => {
  const response = await axiosInstance.delete(`${LOCAL_API_URL}/budaya/${id}`);
  return response.data;
};

const updateBudaya = async (id: string, budaya: AddBudaya) => {
  const response = await axiosInstance.put(
    `${LOCAL_API_URL}/budaya/${id}`,
    budaya
  );
  return response.data;
};

const findOneBudaya = async (id: string) => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/budaya/${id}`);
  return response.data;
};

const BudayaService = {
  fetchAllBudaya,
  deleteBudaya,
  updateBudaya,
  findOneBudaya,
  addBudaya,
};

export default BudayaService;

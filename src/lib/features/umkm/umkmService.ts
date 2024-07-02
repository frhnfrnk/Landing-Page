import { AddUmkm } from "@/utils/types/addUmkm";
import axios from "axios";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchAllUmkm = async () => {
  const response = await axios.get(`${LOCAL_API_URL}/umkm`);
  return response.data;
};

const addUmkm = async (umkm: AddUmkm) => {
  const response = await axios.post(`${LOCAL_API_URL}/umkm`, umkm);
  return response.data;
};

const deleteUmkm = async (id: string) => {
  const response = await axios.delete(`${LOCAL_API_URL}/umkm/${id}`);
  return response.data;
};

const updateUmkm = async (id: string, umkm: AddUmkm) => {
  const response = await axios.put(`${LOCAL_API_URL}/umkm/${id}`, umkm);
  return response.data;
};

const findOneUmkm = async (id: string) => {
  const response = await axios.get(`${LOCAL_API_URL}/umkm/${id}`);
  return response.data;
};

const umkmService = {
  fetchAllUmkm,
  deleteUmkm,
  updateUmkm,
  findOneUmkm,
  addUmkm,
};

export default umkmService;

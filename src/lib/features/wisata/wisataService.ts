import axiosInstance from "@/lib/axios";
import { AddWisata } from "@/utils/types/addWisata";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchAllWisata = async () => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/wisata`);
  return response.data;
};

const addWisata = async (wisata: AddWisata) => {
  const response = await axiosInstance.post(`${LOCAL_API_URL}/wisata`, wisata);
  return response.data;
};

const deleteWisata = async (id: string) => {
  const response = await axiosInstance.delete(`${LOCAL_API_URL}/wisata/${id}`);
  return response.data;
};

const updateWisata = async (id: string, wisata: AddWisata) => {
  const response = await axiosInstance.put(
    `${LOCAL_API_URL}/wisata/${id}`,
    wisata
  );
  return response.data;
};

const findOneWisata = async (id: string) => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/wisata/${id}`);
  return response.data;
};

const wisataService = {
  fetchAllWisata,
  deleteWisata,
  updateWisata,
  findOneWisata,
  addWisata,
};

export default wisataService;

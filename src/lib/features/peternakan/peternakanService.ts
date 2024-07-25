import axiosInstance from "@/lib/axios";
import { AddPeternakan } from "@/utils/types/addPeternakan";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchAllPeternakan = async () => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/peternakan`);
  return response.data;
};

const addPeternakan = async (peternakan: AddPeternakan) => {
  const response = await axiosInstance.post(
    `${LOCAL_API_URL}/peternakan`,
    peternakan
  );
  return response.data;
};

const findOnePeternakan = async (id: string) => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/peternakan/${id}`);
  return response.data;
};

const peternakanService = {
  fetchAllPeternakan,
  addPeternakan,
  findOnePeternakan,
};

export default peternakanService;

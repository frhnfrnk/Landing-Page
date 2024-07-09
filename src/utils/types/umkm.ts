import { Desa } from "@/components/Tab";

export interface Umkm {
  _id?: string;
  name: string;
  category: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  image: string[];
  desa: Desa;
  website?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
}

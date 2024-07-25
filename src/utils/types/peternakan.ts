import { Desa } from "@/components/Tab";

export interface Peternakan {
  _id?: string;
  name: string;
  category: string;
  desa: Desa;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string[];
}

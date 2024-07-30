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
  total: number;
  jantan_dewasa: number;
  betina_dewasa: number;
  jantan_anakan: number;
  betina_anakan: number;
  status_vaksinasi: string;
  obat_cacing: string;
}

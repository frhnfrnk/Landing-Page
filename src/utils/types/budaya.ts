import { Desa } from "@/components/Tab";

export interface Budaya {
  _id?: string;
  name: string;
  author: string;
  category: string;
  description: string;
  content: string;
  desa: Desa;
  image: string[];
}

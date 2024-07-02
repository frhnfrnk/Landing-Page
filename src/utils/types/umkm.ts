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
  website?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
}

"use client";
import { useEffect, useState } from "react";
import { Umkm } from "@/utils/types/umkm";
import Loading from "./Loading";

import DataCard from "./Umkm/DatacardTernak";
import axios from "axios";

export interface Desa {
  _id: number;
  name: string;
}

export default function TabTernak() {
  const [list, setList] = useState<Umkm[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      axios.get(process.env.NEXT_PUBLIC_API_URL + "/peternakan").then((res) => {
        setList(res.data);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mx-auto p-4 font-poppins">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-96">
          <Loading />
        </div>
      ) : (
        <div className="p-4 ">
          <div className="flex gap-5 flex-col">
            {list.length != 0 ? (
              list.map((data, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-center"
                >
                  <DataCard data={data} index={index} />
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <p>Tidak ada data</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

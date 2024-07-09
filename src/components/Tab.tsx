"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { findAllUmkm } from "@/lib/features/umkm/umkmSlice";
import { findAllWisata, setLoading } from "@/lib/features/wisata/wisataSlice";
import axios from "axios";
import { Umkm } from "@/utils/types/umkm";
import Loading from "./Loading";
import DataCard from "./Umkm/Datacard";
import { findAllBudaya } from "@/lib/features/budaya/budayaSlice";

export interface Desa {
  _id: number;
  name: string;
}

export default function TabDesa() {
  const [activeTab, setActiveTab] = useState("Sakti");
  const [list, setList] = useState<Umkm[]>([]);
  const [listDesa, setListDesa] = useState<Desa[]>([]);
  const [filteredData, setFilteredData] = useState<Umkm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const pageNow = pathName.split("/").pop();

  const fetchDesa = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/desa")
      .then((res) => {
        setListDesa(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchList = async () => {
    setIsLoading(true);
    try {
      let res;
      if (pageNow === "umkm") {
        res = await dispatch(findAllUmkm()).unwrap();
      } else if (pageNow === "wisata") {
        res = await dispatch(findAllWisata()).unwrap();
      } else if (pageNow === "budaya") {
        res = await dispatch(findAllBudaya()).unwrap();
      }
      setList(res);
      const filteredData = res.filter((data: Umkm) =>
        data.desa.name.includes(activeTab)
      );
      setFilteredData(filteredData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDesa();
    fetchList();
  }, [pageNow]);

  useEffect(() => {
    const filteredData = list.filter((data: Umkm) =>
      data.desa.name.includes(activeTab)
    );
    setFilteredData(filteredData);
  }, [activeTab, list]);

  const handleToggle = (name: string) => {
    setActiveTab(name);
  };

  return (
    <div className="container mx-auto p-4 font-poppins">
      <div className="flex justify-center mb-4">
        {listDesa.map((data, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-2 rounded ${
              activeTab === data.name
                ? "bg-[#D7713E] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => handleToggle(data.name)}
          >
            Desa {data.name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-96">
          <Loading />
        </div>
      ) : (
        <div className="p-4 ">
          {activeTab === "Desa Sakti" ? (
            <div className="flex gap-5 flex-col">
              {filteredData.length != 0 ? (
                filteredData.map((data, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-center"
                  >
                    <DataCard data={data} pageNow={pageNow} />
                  </div>
                ))
              ) : (
                <div className="w-full flex items-center justify-center">
                  <p>Tidak ada data</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-5 flex-col">
              {filteredData.length != 0 ? (
                filteredData.map((data, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-center"
                  >
                    <DataCard data={data} pageNow={pageNow} />
                  </div>
                ))
              ) : (
                <div className="w-full flex items-center justify-center">
                  <p>Tidak ada data</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

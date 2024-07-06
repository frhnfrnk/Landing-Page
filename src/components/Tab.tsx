"use client";
import { useEffect, useState } from "react";
import DummyUMKM from "./Umkm/umkmCard";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { findAllUmkm } from "@/lib/features/umkm/umkmSlice";
import { findAllWisata } from "@/lib/features/wisata/wisataSlice";
import DataCard from "./Umkm/umkmCard";
import axios from "axios";

interface Desa {
  _id: number;
  name: string;
}

export default function TabDesa() {
  const [activeTab, setActiveTab] = useState("Sakti");
  const [list, setList] = useState([]);
  const [listDesa, setListDesa] = useState<Desa[]>([]);
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
    if (pageNow === "umkm") {
      await dispatch(findAllUmkm())
        .unwrap()
        .then((res) => {
          setList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (pageNow === "wisata") {
      await dispatch(findAllWisata())
        .unwrap()
        .then((res) => {
          setList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (pageNow === "budaya") {
      // fetch all
    }
  };

  useEffect(() => {
    fetchDesa();
    fetchList();
  }, []);

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
            onClick={() => setActiveTab(data.name)}
          >
            Desa {data.name}
          </button>
        ))}
      </div>
      <div className="p-4 ">
        {activeTab === "Desa Sakti" ? (
          <div className="flex gap-5 flex-col">
            {list.map((data, index) => (
              <div key={index}>
                <DataCard data={data} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-5 flex-col">
            {list.map((data, index) => (
              <div key={index}>
                <DataCard data={data} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

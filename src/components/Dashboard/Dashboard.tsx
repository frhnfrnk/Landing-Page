"use client";
import { findAllBudaya } from "@/lib/features/budaya/budayaSlice";
import { findAllPeternakan } from "@/lib/features/peternakan/peternakanSlice";
import { findAllUmkm } from "@/lib/features/umkm/umkmSlice";
import { findAllWisata } from "@/lib/features/wisata/wisataSlice";
import { useAppDispatch } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import Loading from "../Loading";
import Link from "next/link";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [dataCount, setDataCount] = useState({
    umkm: 0,
    wisata: 0,
    budaya: 0,
    peternakan: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchDataReport = async () => {
    setLoading(true);
    let umkm = await dispatch(findAllUmkm());
    let wisata = await dispatch(findAllWisata());
    let peternakan = await dispatch(findAllPeternakan());
    let budaya = await dispatch(findAllBudaya());

    if (
      umkm.payload &&
      wisata.payload &&
      peternakan.payload &&
      budaya.payload
    ) {
      console.log(umkm.payload);
      setDataCount({
        umkm: umkm.payload.length,
        wisata: wisata.payload.length,
        budaya: budaya.payload.length,
        peternakan: peternakan.payload.length,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataReport();
  }, []);

  return (
    <div className="w-full">
      <h1 className="font-sirukota text-center text-5xl mb-5">DASHBOARD</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/admin/umkm">
            <div
              className="bg-[#D7713E] text-white w-48 aspect-square border-[1px]  rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform
            "
            >
              <h1 className="text-5xl mb-2 font-sirukota">{dataCount.umkm}</h1>
              <h1 className="text-xl font-poppins">UMKM</h1>
            </div>
          </Link>
          <Link href="/admin/wisata">
            <div
              className="bg-[#D7713E] text-white w-48 aspect-square border-[1px]  rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform
            "
            >
              <h1 className="text-5xl mb-2 font-sirukota">
                {dataCount.wisata}
              </h1>
              <h1 className="text-xl font-poppins">Wisata</h1>
            </div>
          </Link>
          <Link href="/admin/budaya">
            <div
              className="bg-[#D7713E] text-white w-48 aspect-square border-[1px]  rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform
            "
            >
              <h1 className="text-5xl mb-2 font-sirukota">
                {dataCount.budaya}
              </h1>
              <h1 className="text-xl font-poppins">Budaya</h1>
            </div>
          </Link>
          <Link href="/admin/peternakan">
            <div
              className="bg-[#D7713E] text-white w-48 aspect-square border-[1px]  rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform
            "
            >
              <h1 className="text-5xl mb-2 font-sirukota">
                {dataCount.peternakan}
              </h1>
              <h1 className="text-xl font-poppins">Peternakan</h1>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

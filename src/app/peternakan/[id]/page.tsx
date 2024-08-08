"use client";
import CarouselComponent from "@/components/Detail/Carousel";
import MapComponent from "@/components/Detail/MapComponent";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import ImageAbsDetail from "@/components/Umkm/ImageAbsDetail";
import { findOneUmkm } from "@/lib/features/umkm/umkmSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Umkm } from "@/utils/types/umkm";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailPeternakan = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);
  const [peternakan, setPeternakan] = useState({} as any);
  const [fetchStatus, setFetchStatus] = useState(false);

  const fetchPeternakan = async () => {
    setLoading(true);
    const id = pathName.split("/").pop();
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/peternakan/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setPeternakan(res.data);
        } else {
          console.log("error");
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    if (!fetchStatus) {
      fetchPeternakan();
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#F5EBE7] ">
      <ImageAbsDetail />
      {loading ? (
        <Loading />
      ) : (
        <div className="font-poppins w-full lg:w-1/2 mx-auto -translate-y-0 lg:-translate-y-[50px] mt-10 lg:mt-0 px-5">
          <CarouselComponent img={peternakan.image} />
          <div className="lg:w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mt-5 mb-3 text-center lg:text-left">
              {peternakan.name}
            </h1>
            <p className="text-xl">{peternakan.category}</p>
            <p className="mt-5 text-center lg:text-left">
              {peternakan.address}
            </p>
            <div className="w-full flex flex-col mt-5">
              <p className="mb-2">Jumlah ternak: {peternakan.total}</p>
              {peternakan.jantan_dewasa != "0" && (
                <p>Jantan dewasa: {peternakan.jantan_dewasa}</p>
              )}
              {peternakan.jantan_anakan != "0" && (
                <p>Jantan anakan: {peternakan.jantan_anakan}</p>
              )}
              {peternakan.betina_dewasa != "0" && (
                <p>Betina dewasa: {peternakan.betina_dewasa}</p>
              )}
              {peternakan.betina_anakan != "0" && (
                <p>Betina anakan: {peternakan.betina_anakan}</p>
              )}

              <p className="mt-2">
                Status vaksinasi: {peternakan.status_vaksinasi}
              </p>
              <p className="mb-2">Obat cacing: {peternakan.obat_cacing}</p>
              <p>
                Terakhir diperbarui :{" "}
                {new Date(peternakan.updatedAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className=" mt-5 mb-2 font-bold">Lokasi : </p>
              {peternakan.latitude ? (
                <div className="w-full h-[50vh] p-3 rounded bg-primary mb-16">
                  <MapComponent data={peternakan} />
                </div>
              ) : (
                <p>Location data not available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPeternakan;

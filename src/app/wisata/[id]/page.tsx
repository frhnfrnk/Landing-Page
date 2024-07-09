"use client";
import CarouselComponent from "@/components/Detail/Carousel";
import MapComponent from "@/components/Detail/MapComponent";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import ImageAbsDetail from "@/components/Umkm/ImageAbsDetail";
import { findOneWisata } from "@/lib/features/wisata/wisataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Umkm } from "@/utils/types/umkm";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailUMKM = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const statusState = useAppSelector((state) => state.umkm.status);
  const [status, setStatus] = useState("loading");
  const [wisataData, setWisataData] = useState({} as Umkm);
  const [fetchStatus, setFetchStatus] = useState(false);

  const fetchWisata = async () => {
    const id = pathName.split("/").pop();
    if (id) {
      dispatch(findOneWisata(id))
        .unwrap()
        .then((res) => {
          setWisataData(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description: err.response.data.message,
            variant: "destructive",
          });
        });
    }
  };

  useEffect(() => {
    if (!fetchStatus) {
      fetchWisata();
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  useEffect(() => {
    setStatus(statusState);
  }, [statusState]);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#F5EBE7]">
      <ImageAbsDetail />
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className=" font-poppins w-full lg:w-1/2 mx-auto -translate-y-0 lg:-translate-y-[50px] mt-10 lg:mt-0 px-5">
          <CarouselComponent img={wisataData.image} />
          <div className="lg:w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl lg:text-4xl font-bold mt-5 mb-3">
              {wisataData.name}
            </h1>
            <p className="text-sm lg:text-xl">{wisataData.category}</p>
            <p className="mt-2 lg:mt-5 text-center text-sm lg:text-left">
              {wisataData.address}
            </p>
            <p className="mt-8 text-justify indent-4 lg:indent-10">
              {wisataData.description}
            </p>
            <p className="mt-5 mb-2 font-bold">Lokasi:</p>
            {wisataData.latitude ? (
              <div className="w-full h-[50vh] p-3 rounded bg-primary mb-16">
                <MapComponent data={wisataData} />
              </div>
            ) : (
              <p>Location data not available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailUMKM;

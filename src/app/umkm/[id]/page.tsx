"use client";
import CarouselComponent from "@/components/Detail/Carousel";
import MapComponent from "@/components/Detail/MapComponent";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import ImageAbsDetail from "@/components/Umkm/ImageAbsDetail";
import { findOneUmkm } from "@/lib/features/umkm/umkmSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Umkm } from "@/utils/types/umkm";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailUMKM = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const statusState = useAppSelector((state) => state.umkm.status);
  const [status, setStatus] = useState("loading");
  const [umkmData, setUmkmData] = useState({} as Umkm);
  const [fetchStatus, setFetchStatus] = useState(false);

  const fetchUmkm = async () => {
    const id = pathName.split("/").pop();
    if (id) {
      dispatch(findOneUmkm(id))
        .unwrap()
        .then((res) => {
          setUmkmData(res);
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
      fetchUmkm();
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  useEffect(() => {
    setStatus(statusState);
  }, [statusState]);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#F5EBE7] ">
      <ImageAbsDetail />
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="font-poppins w-full lg:w-1/2 mx-auto -translate-y-0 lg:-translate-y-[50px] mt-10 lg:mt-0 px-5">
          <CarouselComponent img={umkmData.image} />
          <div className="lg:w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mt-5 mb-3">{umkmData.name}</h1>
            <p className="text-xl">{umkmData.category}</p>
            <p className="mt-5">{umkmData.address}</p>
            <p className="mt-8 text-justify indent-10">
              {umkmData.description}
            </p>
            <div className="w-full">
              <p className="mt-5">
                Telepon : {umkmData.phoneNumber ? umkmData.phoneNumber : "-"}
              </p>
              <p className="">
                Website : {umkmData.website ? umkmData.website : "-"}
              </p>
              <p className="">
                Facebook : {umkmData.facebook ? umkmData.facebook : "-"}
              </p>
              <p className="">
                Instagram : {umkmData.instagram ? umkmData.instagram : "-"}
              </p>

              <p className=" mt-5 mb-2 font-bold">Lokasi : </p>
              {umkmData.latitude ? (
                <div className="w-full h-[50vh] p-3 rounded bg-primary">
                  <MapComponent data={umkmData} />
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

export default DetailUMKM;

"use client";
import CarouselComponent from "@/components/Detail/Carousel";
import MapComponent from "@/components/Detail/MapComponent";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import ImageAbsDetail from "@/components/Umkm/ImageAbsDetail";
import { findOneBudaya } from "@/lib/features/budaya/budayaSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Budaya } from "@/utils/types/budaya";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailBudaya = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const statusState = useAppSelector((state) => state.budaya.status);
  const [status, setStatus] = useState("loading");
  const [budayaData, setBudayaData] = useState({} as Budaya);
  const [fetchStatus, setFetchStatus] = useState(false);

  const fetchBudaya = async () => {
    const id = pathName.split("/").pop();
    if (id) {
      await dispatch(findOneBudaya(id))
        .unwrap()
        .then((res) => {
          setBudayaData(res);
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
      fetchBudaya();
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
          <CarouselComponent img={budayaData.image} />
          <div className="lg:w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mt-5 mb-3 text-center lg:text-center">
              {budayaData.name}
            </h1>
            <p className="text-xl">{budayaData.category}</p>

            <div
              dangerouslySetInnerHTML={{ __html: budayaData.content }}
              className="article text-justify mt-5 lg:mt-10
              "
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBudaya;

"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import PeternakanInfoForm from "@/components/Form/PeternakanForm";
import WisataInfoForm from "@/components/Form/WisataForm";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { logout } from "@/lib/features/auth/authSlice";
import {
  addPeternakan,
  emtpyDataPeternakan,
  setLoading,
} from "@/lib/features/peternakan/peternakanSlice";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import React, { useEffect } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const peternakanData = useAppSelector((state) => state.peternakan.peternakan);
  const imageData = useAppSelector((state) => state.peternakan.image);

  const uploadImage = async (image: any) => {
    let url = [] as any;
    try {
      await Promise.all(
        image.map(async (imgFile: any, index: number) => {
          if (typeof imgFile === "string") {
            url.push(imgFile);
            return;
          }
          try {
            const response = await axiosInstance.post(
              `https://backend-nirwana.vercel.app/cloudinary/upload`,
              imgFile
            );

            url.push(response.data);
          } catch (error: any) {
            if (error.response.data.message == "Unauthorized") {
              dispatch(logout());
              return;
            }
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
    return url;
  };

  const handleAdd = async () => {
    dispatch(setLoading("loading"));
    let data = { ...peternakanData } as any;
    data.latitude = parseFloat(data.latitude);
    data.longitude = parseFloat(data.longitude);
    const image = imageData as any;
    let imageUrl = [] as any;
    if (image.length > 0) {
      imageUrl = await uploadImage(image);
      data = { ...data, image: imageUrl };
      console.log(data);
    }
    dispatch(addPeternakan(data))
      .unwrap()
      .then((res) => {
        dispatch(emtpyDataPeternakan());
        toast({
          title: "Success",
          description: "Peternakan has been saved",
          variant: "default",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message == "Unauthorized") {
          dispatch(logout());
          return;
        }
        toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-sm lg:text-xl font-semibold">
        Form Penambahan Peternakan
      </h1>
      <div className="flex gap-2">
        <PrimaryButton className="text-xs" onClick={handleAdd}>
          {" "}
          Simpan
        </PrimaryButton>
      </div>
    </div>
  );
};

const Create = () => {
  const status = useAppSelector((state) => state.umkm.status);

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="flex flex-col lg:flex-row gap-4">
            <PeternakanInfoForm />
          </div>
        </>
      )}
    </>
  );
};

export default Create;

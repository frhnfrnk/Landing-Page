"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import UmkmInfoForm from "@/components/Form/UmkmForm";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { logout } from "@/lib/features/auth/authSlice";
import {
  addUmkm,
  emtpyDataUmkm,
  setLoading,
} from "@/lib/features/umkm/umkmSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import React, { useEffect } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const umkmData = useAppSelector((state) => state.umkm.umkm);
  const imageData = useAppSelector((state) => state.umkm.image);

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
    let data = { ...umkmData } as any;
    data.latitude = parseFloat(data.latitude);
    data.longitude = parseFloat(data.longitude);
    const image = imageData as any;
    let imageUrl = [] as any;
    if (image.length > 0) {
      imageUrl = await uploadImage(image);
      data = { ...data, image: imageUrl };
    }
    dispatch(addUmkm(data))
      .unwrap()
      .then((res) => {
        dispatch(emtpyDataUmkm());
        toast({
          title: "Success",
          description: "Umkm has been saved",
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
      <h1 className="text-sm lg:text-xl font-semibold">Form Penambahan Umkm</h1>
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
            <UmkmInfoForm />
          </div>
        </>
      )}
    </>
  );
};

export default Create;

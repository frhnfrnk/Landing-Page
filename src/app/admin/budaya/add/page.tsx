"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import BudayaForm from "@/components/Form/BudayaForm";
import UmkmInfoForm from "@/components/Form/UmkmForm";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { logout } from "@/lib/features/auth/authSlice";
import {
  addBudaya,
  emtpyDatabudaya,
  setLoading,
} from "@/lib/features/budaya/budayaSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import React, { useEffect } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const budayaData = useAppSelector((state) => state.budaya.budaya);
  const imageData = useAppSelector((state) => state.budaya.image);

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
    let data = { ...budayaData } as any;
    const image = imageData as any;
    let imageUrl = [] as any;
    if (image.length > 0) {
      imageUrl = await uploadImage(image);
      data = { ...data, image: imageUrl };
    }
    console.log(data);
    dispatch(addBudaya(data))
      .unwrap()
      .then((res) => {
        dispatch(emtpyDatabudaya());
        toast({
          title: "Success",
          description: "Budaya has been saved",
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
        Form Penambahan Budaya
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
  const status = useAppSelector((state) => state.budaya.status);

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="flex flex-col lg:flex-row gap-4">
            <BudayaForm />
          </div>
        </>
      )}
    </>
  );
};

export default Create;

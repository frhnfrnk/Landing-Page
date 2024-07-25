"use client";
import React, { use, useEffect, useState } from "react";
import InputField from "../Field/InputField";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextArea from "../Field/TextAreaField";

import { usePathname } from "next/navigation";
import axios from "axios";
import { setDataPeternakan } from "@/lib/features/peternakan/peternakanSlice";
import ImageField from "../Field/ImageFieldPeternakan";

interface Desa {
  _id: number;
  name: string;
}

const PeternakanInfoForm = () => {
  const dispatch = useAppDispatch();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [listDesa, setListDesa] = useState([] as Desa[]);
  const pathName = usePathname();
  const peternakan = useAppSelector((state) => state.peternakan.peternakan);

  const handleChange = (id: string, value: any) => {
    dispatch(setDataPeternakan({ [id]: value }));
  };

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

  const handleCategory = (value: string) => {
    dispatch(setDataPeternakan({ category: value }));
  };

  const handleDesa = (value: string) => {
    const findId = listDesa.find((desa) => desa.name === value);
    dispatch(setDataPeternakan({ desa: findId?._id }));
  };

  useEffect(() => {
    fetchDesa();
  }, []);

  return (
    <div className="w-full font-poppins">
      <form className="  p-6 border-[0.8px] border-primary rounded-xl flex gap-5">
        <div className="w-[65%]">
          <InputField
            label="Title"
            wajib
            type="text"
            value={peternakan ? peternakan.name : ""}
            id="name"
            placeholder="Enter name"
            onChange={(value) => {
              handleChange("name", value);
            }}
          />

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="category">Category</label>
            <Select onValueChange={handleCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sapi">Sapi</SelectItem>
                <SelectItem value="Babi">Babi</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="desa">Desa</label>
            <Select
              onValueChange={handleDesa}
              defaultValue={peternakan?.desa?.name}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Desa" />
              </SelectTrigger>
              <SelectContent>
                {listDesa.map((data, index) => (
                  <SelectItem key={index} value={data.name}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TextArea
            label="Description"
            value={peternakan ? peternakan.description : ""}
            id="description"
            onChange={(value) => {
              handleChange("description", value);
            }}
          />

          <InputField
            label="Alamat Lengkap"
            type="text"
            wajib
            value={peternakan ? peternakan.address : ""}
            id="address"
            placeholder="Masukkan alamat lengkap"
            onChange={(value) => {
              handleChange("address", value);
            }}
          />

          <div className="flex gap-5 shrink">
            <InputField
              label="Latitude"
              type="text"
              wajib
              value={peternakan ? peternakan.latitude : ""}
              id="latitude"
              placeholder="Enter title"
              onChange={(value) => {
                handleChange("latitude", value);
              }}
            />
            <InputField
              label="Longitude"
              type="text"
              wajib
              value={peternakan ? peternakan.longitude : ""}
              id="longitude"
              placeholder="Enter title"
              onChange={(value) => {
                handleChange("longitude", value);
              }}
            />
          </div>
        </div>
        <div className="w-[35%] p-6">
          <ImageField label="Image Cover" id="cover" img={peternakan?.image} />
        </div>
      </form>
    </div>
  );
};

export default PeternakanInfoForm;

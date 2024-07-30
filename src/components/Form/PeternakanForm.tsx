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

  const handleVaksin = (value: string) => {
    dispatch(setDataPeternakan({ status_vaksinasi: value }));
  };

  const handleObatCacing = (value: string) => {
    dispatch(setDataPeternakan({ obat_cacing: value }));
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

          <TextArea
            label="Description"
            value={peternakan ? peternakan.description : ""}
            id="description"
            onChange={(value) => {
              handleChange("description", value);
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
          <div className="flex gap-5 shrink">
            <InputField
              label="Jumlah ternak"
              type="text"
              wajib
              value={peternakan ? peternakan.total : ""}
              id="total"
              placeholder="Enter total"
              onChange={(value) => {
                handleChange("total", value);
              }}
            />
            <InputField
              label="Jantan Dewasa"
              type="text"
              wajib
              value={peternakan ? peternakan.jantan_dewasa : ""}
              id="jantan_dewasa"
              placeholder="Enter total jantan dewasa"
              onChange={(value) => {
                handleChange("jantan_dewasa", value);
              }}
            />
          </div>
          <div className="flex gap-5 shrink">
            <InputField
              label="Betina Dewasa"
              type="text"
              wajib
              value={peternakan ? peternakan.betina_dewasa : ""}
              id="betina_dewasa"
              placeholder="Enter total betina dewasa"
              onChange={(value) => {
                handleChange("betina_dewasa", value);
              }}
            />
            <InputField
              label="Jantan Anakan"
              type="text"
              wajib
              value={peternakan ? peternakan.jantan_anakan : ""}
              id="jantan_anakan"
              placeholder="Enter total jantan anakan"
              onChange={(value) => {
                handleChange("jantan_dewasa", value);
              }}
            />
            <InputField
              label="Betina Anakan"
              type="text"
              wajib
              value={peternakan ? peternakan.betina_anakan : ""}
              id="betina_anakan"
              placeholder="Enter total betina anakan"
              onChange={(value) => {
                handleChange("jantan_dewasa", value);
              }}
            />
          </div>
          <div className="flex gap-5 shrink">
            <div className="w-full">
              <label htmlFor="Status Vaksinasi">Status Vaksinasi</label>
              <Select
                onValueChange={handleVaksin}
                defaultValue={peternakan?.status_vaksinasi}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status Vaksinasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Belum divaksin">Belum divaksin</SelectItem>
                  <SelectItem value="Sudah divaksin">Sudah divaksin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <label htmlFor="Pemberian Obat Cacing">
                Pemberian Obat Cacing
              </label>
              <Select
                onValueChange={handleObatCacing}
                defaultValue={peternakan?.obat_cacing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status Vaksinasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Belum diberikan">
                    Belum diberikan
                  </SelectItem>
                  <SelectItem value="Sudah diberikan">
                    Sudah diberikan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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

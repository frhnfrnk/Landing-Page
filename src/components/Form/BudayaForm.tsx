"use client";
import React, { use, useEffect, useState } from "react";
import InputField from "../Field/InputField";
import ImageField from "../Field/ImageFieldBudaya";
import SecondaryButton from "../Button/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextArea from "../Field/TextAreaField";

import { usePathname } from "next/navigation";
import { setDataUmkm } from "@/lib/features/umkm/umkmSlice";
import axios from "axios";
import { setDatabudaya } from "@/lib/features/budaya/budayaSlice";
import Tiptap from "../TextEditor/Tiptap";

interface Desa {
  _id: number;
  name: string;
}

const BudayaForm = () => {
  const dispatch = useAppDispatch();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [content, setContent] = useState("");
  const [listDesa, setListDesa] = useState([] as Desa[]);
  const pathName = usePathname();
  const budaya = useAppSelector((state) => state.budaya.budaya);

  const handleChange = (id: string, value: any) => {
    dispatch(setDatabudaya({ [id]: value }));
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
    dispatch(setDatabudaya({ category: value }));
  };

  const handleDesa = (value: string) => {
    dispatch(setDatabudaya({ desa: value }));
  };

  const handleContentChange = (value: string) => {
    console.log(value);
    dispatch(setDatabudaya({ content: value }));
  };

  useEffect(() => {
    fetchDesa();
  }, []);

  return (
    <div className="w-full font-poppins">
      <form className="  p-6 border-[0.8px] border-primary rounded-xl flex flex-col lg:flex-row gap-5">
        <div className="w-full ">
          <InputField
            label="Title"
            wajib
            type="text"
            value={budaya ? budaya.name : ""}
            id="name"
            placeholder="Enter name"
            onChange={(value) => {
              handleChange("name", value);
            }}
          />

          <InputField
            label="Author"
            wajib
            type="text"
            value={budaya ? budaya.author : ""}
            id="author"
            placeholder="Enter author"
            onChange={(value) => {
              handleChange("author", value);
            }}
          />

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="category">Category</label>
            <Select
              onValueChange={handleCategory}
              defaultValue={budaya ? budaya.category : ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sejarah">Sejarah</SelectItem>
                <SelectItem value="Musik">Musik</SelectItem>
                <SelectItem value="Tarian">Tarian</SelectItem>
                <SelectItem value="Upacara Adat">Upacara Adat</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="desa">Desa</label>
            <Select
              onValueChange={handleDesa}
              defaultValue={budaya ? budaya.desa?.name : ""}
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
            value={budaya ? budaya.description : ""}
            id="description"
            onChange={(value) => {
              handleChange("description", value);
            }}
          />

          <div className="w-full">
            <Tiptap content={content} onChange={handleContentChange} />
          </div>
          <ImageField label="Image Cover" id="cover" img={budaya?.image} />
        </div>
      </form>
    </div>
  );
};

export default BudayaForm;

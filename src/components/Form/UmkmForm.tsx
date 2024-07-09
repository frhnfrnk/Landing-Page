"use client";
import React, { use, useEffect, useState } from "react";
import InputField from "../Field/InputField";
import ImageField from "../Field/ImageFieldUmkm";
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

interface Desa {
  _id: number;
  name: string;
}

const UmkmInfoForm = () => {
  const dispatch = useAppDispatch();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [listDesa, setListDesa] = useState([] as Desa[]);
  const pathName = usePathname();
  const umkm = useAppSelector((state) => state.umkm.umkm);

  const handleChange = (id: string, value: any) => {
    dispatch(setDataUmkm({ [id]: value }));
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
    dispatch(setDataUmkm({ category: value }));
  };

  const handleDesa = (value: string) => {
    const findId = listDesa.find((desa) => desa.name === value);
    dispatch(setDataUmkm({ desa: findId?._id }));
  };

  useEffect(() => {
    fetchDesa();
  }, []);

  return (
    <div className="w-full font-poppins">
      <form className="  p-6 border-[0.8px] border-primary rounded-xl flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[65%]">
          <InputField
            label="Title"
            wajib
            type="text"
            value={umkm ? umkm.name : ""}
            id="name"
            placeholder="Enter name"
            onChange={(value) => {
              handleChange("name", value);
            }}
          />

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="category">Category</label>
            <Select
              onValueChange={handleCategory}
              defaultValue={umkm ? umkm.category : ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F&B">F&B</SelectItem>
                <SelectItem value="Kerajinan">Kerajinan</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="desa">Desa</label>
            <Select
              onValueChange={handleDesa}
              defaultValue={umkm ? umkm.desa?.name : ""}
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
            value={umkm ? umkm.description : ""}
            id="description"
            onChange={(value) => {
              handleChange("description", value);
            }}
          />

          <InputField
            label="Alamat Lengkap"
            type="text"
            wajib
            value={umkm ? umkm.address : ""}
            id="address"
            placeholder="Masukkan alamat lengkap"
            onChange={(value) => {
              handleChange("address", value);
            }}
          />

          <div className="flex flex-col lg:flex-row gap-5 shrink">
            <InputField
              label="Latitude"
              type="text"
              wajib
              value={umkm ? umkm.latitude : ""}
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
              value={umkm ? umkm.longitude : ""}
              id="longitude"
              placeholder="Enter title"
              onChange={(value) => {
                handleChange("longitude", value);
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-5 shrink">
            <InputField
              label="Nomor Telepon"
              type="text"
              value={umkm ? umkm.phoneNumber : ""}
              id="phoneNumber"
              placeholder="Enter phone number"
              onChange={(value) => {
                handleChange("phoneNumber", value);
              }}
            />
            <InputField
              label="Email"
              type="text"
              value={umkm ? umkm.email : ""}
              id="email"
              placeholder="Enter email"
              onChange={(value) => {
                handleChange("email", value);
              }}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <InputField
              label="Website"
              type="text"
              value={umkm ? umkm.website : ""}
              id="website"
              placeholder="Enter website"
              onChange={(value) => {
                handleChange("website", value);
              }}
            />
            <InputField
              label="Facebook"
              type="text"
              value={umkm ? umkm.facebook : ""}
              id="facebook"
              placeholder="Enter facebook"
              onChange={(value) => {
                handleChange("facebook", value);
              }}
            />
            <InputField
              label="Instagram"
              type="text"
              value={umkm ? umkm.instagram : ""}
              id="instagram"
              placeholder="Enter instagram"
              onChange={(value) => {
                handleChange("instagram", value);
              }}
            />
          </div>
        </div>
        <div className="w-full lg:w-[35%] p-0 lg:p-6">
          <ImageField label="Image Cover" id="cover" img={umkm?.image} />
        </div>
      </form>
    </div>
  );
};

export default UmkmInfoForm;

interface SelectCategoryProps {
  categories: any[];
  setCategories: (value: string) => void;
  setSubcategories: (value: string) => void;
  value?: string;
}

const SelectCategory = ({
  categories,
  setCategories,
  setSubcategories,
  value,
}: SelectCategoryProps) => {
  const handleChange = (value: string) => {
    const category_id = categories.find((category) => {
      return category.subCategories.find((sub: any) => sub.name === value);
    });
    const sub_category_id = category_id.subCategories.find(
      (sub: any) => sub.name === value
    );
    setCategories(category_id._id);
    setSubcategories(sub_category_id._id);
  };

  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    if (categories.length > 0) {
      const category_id = categories.find((category) => {
        return category.subCategories.find((sub: any) => sub._id === value);
      });
      const sub_category_id = category_id?.subCategories.find(
        (sub: any) => sub._id === value
      );
      setDefaultValue(sub_category_id?.name);
    }
  }, [categories]);

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger className="border-gray-900 border-[0.8px] rounded p-2 placeholder:text-sm focus:">
        <SelectValue placeholder={defaultValue ? defaultValue : "Select"} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category: any, index: number) => (
          <SelectGroup key={index}>
            <SelectLabel>{category.name}</SelectLabel>
            {category.subCategories.map((sub: any, index: number) => (
              <SelectItem key={index} value={sub.name}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

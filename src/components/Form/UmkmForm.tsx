"use client";
import React, { use, useEffect, useState } from "react";
import InputField from "../Field/InputField";
import ImageField from "../Field/ImageFieldUmkm";
import SecondaryButton from "../Button/SecondaryButton";
import { useAppDispatch } from "@/lib/store";
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

const UmkmInfoForm = ({ umkm }: any) => {
  const dispatch = useAppDispatch();
  const [fetchStatus, setFetchStatus] = useState(false);
  const pathName = usePathname();

  const handleChange = (id: string, value: any) => {
    dispatch(setDataUmkm({ [id]: value }));
  };

  return (
    <div className="w-full lg:w-[40%]">
      <form className="  p-6 border-[0.8px] border-primary rounded-xl ">
        <InputField
          label="Title"
          type="text"
          value={umkm ? umkm.title : ""}
          id="title"
          placeholder="Enter title"
          onChange={(value) => {
            handleChange("title", value);
          }}
        />

        <InputField
          label="Tags"
          value={umkm ? umkm.category : ""}
          placeholder="Enter Category"
          type="text"
          id="tags"
          onChange={(value) => {
            const tags = value.split(",");
            handleChange("tags", tags);
          }}
        />
        <TextArea
          label="Description"
          value={umkm ? umkm.description : ""}
          id="description"
          onChange={(value) => {
            handleChange("description", value);
          }}
        />

        <ImageField label="Image Cover" id="cover" img={umkm?.image} />
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

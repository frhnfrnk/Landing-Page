"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useAppDispatch } from "@/lib/store";

import axios from "axios";
import { addImage, updateImage } from "@/lib/features/umkm/umkmSlice";

// Interface untuk props input field
interface ImageFieldProps {
  label: string;
  img?: string;
  id: string;
}

// Komponen ImageField
const ImageField: React.FC<ImageFieldProps> = ({ label, img, id }) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>(img ? img : []);

  const handleInputImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    dispatch(addImage(formData));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage([...image, reader.result]);
    };
  };

  const handleChangeImage = (e: any, index: number) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    dispatch(updateImage({ index, newValue: formData }));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const newImage = [...image];
      newImage[index] = reader.result;
      setImage(newImage);
    };
  };

  const handleFileInputBlur = () => {
    if (!image) {
      setImage([]);
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-3 ">
      {image.length == 0 ? (
        <label
          className="flex justify-center flex-col items-center border-2 border-neutral-100 w-full aspect-square rounded-xl cursor-pointer"
          htmlFor="fileInput"
        >
          <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
          <p className="text-neutral-500 text-[12px] my-1">Add image</p>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleInputImage}
            onBlur={handleFileInputBlur}
          />
        </label>
      ) : (
        <>
          <div className="w-full gap-2 flex flex-col mb-12 ">
            {image.map((img: any, index: number) => (
              <div className="relative" key={index}>
                <div className="flex justify-center flex-col items-center w-full aspect-square rounded-xl">
                  <img src={img} alt="" className="rounded-xl" />
                  <label
                    className="absolute bg-pink-700 text-neutral-100 rounded-xl px-2 py-1 text-sm my-2 opacity-0 transition-opacity duration-300"
                    htmlFor={`fileInput${index}`}
                  >
                    Change photo
                  </label>
                  <input
                    type="file"
                    id={`fileInput${index}`}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleChangeImage(e, index)}
                    onBlur={handleFileInputBlur}
                  />
                </div>
              </div>
            ))}
          </div>
          <label
            className="flex justify-center flex-col items-center border-2 border-neutral-100 w-1/2 aspect-square rounded-xl cursor-pointer"
            htmlFor="fileInput"
          >
            <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
            <p className="text-neutral-500 text-[12px] my-1">Add other image</p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleInputImage}
              onBlur={handleFileInputBlur}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default ImageField;

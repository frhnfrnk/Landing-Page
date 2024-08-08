"use client";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useAppDispatch } from "@/lib/store";

import {
  addImage,
  deleteImage,
  updateImage,
} from "@/lib/features/wisata/wisataSlice";

// Interface untuk props input field
interface ImageFieldProps {
  label: string;
  img?: any[];
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

  const handleDeleteImage = (index: number) => {
    dispatch(deleteImage(index));
    const newImage = [...image];
    newImage.splice(index, 1);
    setImage(newImage);
  };

  return (
    <div className="flex flex-col gap-1 mb-3 ">
      {image.length == 0 ? (
        <label
          className="flex justify-center flex-col items-center border-2 border-neutral-100 w-full aspect-square rounded-xl cursor-pointer"
          htmlFor="fileInput"
        >
          <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
          <p className="text-neutral-500 text-[12px] my-1">Add cover</p>
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
              <div
                className="group relative flex flex-col w-full rounded-xl gap-2 mb-5"
                key={index}
              >
                <img src={img} alt="" className="rounded-xl w-full" />
                <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-xl transition-opacity duration-300 "></div>
                <div className="absolute w-full h-full flex items-center justify-center">
                  <label
                    className="opacity-0 group-hover:opacity-100  text-black rounded-xl px-2 py-1 text-sm my-2 transition-opacity duration-300 cursor-pointer "
                    htmlFor={`fileInput${index}`}
                  >
                    <p className="bg-[#D7713E] hover:bg-[#ac5a32] p-3 rounded-full text-white font-poppins">
                      Change photo
                    </p>
                    <input
                      type="file"
                      id={`fileInput${index}`}
                      accept="image/*"
                      className="hidden "
                      onChange={(e) => handleChangeImage(e, index)}
                      onBlur={handleFileInputBlur}
                    />
                  </label>
                  <div
                    className="flex items-center bg-[#D7713E] hover:bg-[#ac5a32] trasitio px-5 py-3 rounded-full opacity-0 group-hover:opacity-100 text-black text-sm my-2 transition-all duration-300 cursor-pointer"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <p className="text-white font-poppins">Delete</p>
                    <MdDelete className="text-white text-2xl" />
                  </div>
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

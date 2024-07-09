import { useRouter } from "next/navigation";
import React from "react";

const DataCard = ({ data, pageNow }: any) => {
  const router = useRouter();
  const goToDetail = () => {
    router.push(`/${pageNow}/${data._id}`);
  };

  return (
    <div
      onClick={goToDetail}
      className="relative z-10 w-full md:w-[50%] flex flex-col md:flex-row items-center justify-center bg-white rounded-md h-auto md:h-72 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer"
    >
      <div className="w-full md:w-[60%] h-full flex flex-col justify-between p-5">
        <div>
          <h1 className="text-2xl font-poppins font-bold">{data.name}</h1>
          <h2 className="text-base font-poppins">{data.category}</h2>
          <p className="text-sm font-poppins mt-2">{data.address}</p>
        </div>
        <p className="text-sm font-poppins mt-4 text-justify">
          {data.description}
        </p>
      </div>
      <div className="w-full md:w-[40%] h-48 md:h-full flex items-center justify-center p-5 md:p-2">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default DataCard;

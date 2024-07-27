"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DataCard = ({ data, pageNow, index }: any) => {
  const router = useRouter();
  const goToDetail = () => {
    router.push(`/${pageNow}/${data._id}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={goToDetail}
        initial={{
          opacity: index % 2 === 0 ? 0 : 1,
          x: index % 2 === 0 ? -200 : 0,
        }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: index % 2 === 0 ? 1 : 0,
          x: index % 2 === 0 ? 0 : -200,
        }}
        whileHover={{ scale: 1.05 }}
        className="relative z-10 w-full md:w-[50%] flex flex-col-reverse md:flex-row items-center justify-center bg-white rounded-md h-auto md:h-72 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer"
      >
        <div className="w-full md:w-[60%] h-full flex flex-col justify-between p-5">
          <div>
            <h1 className="text-2xl font-poppins font-bold">{data.name}</h1>
            <h2 className="text-base font-poppins">{data.category}</h2>
            <p className="text-sm font-poppins mt-2">{data.address}</p>
          </div>
          <p className="text-sm font-poppins mt-4 text-justify">
            <Description description={data.description} />
          </p>
        </div>
        <div className="w-full md:w-[40%] h-48 md:h-full flex items-center justify-center p-5 md:p-2">
          <img
            src={data.image[0]}
            alt={data.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DataCard;

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [readMore, setReadMore] = useState<boolean>(false);
  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    var truncatedText = text.slice(0, maxLength);
    truncatedText = truncatedText.slice(
      0,
      Math.min(truncatedText.length, truncatedText.lastIndexOf(" "))
    );
    return truncatedText + "...";
  }

  useEffect(() => {
    if (description) {
      if (description.length > 200) {
        setReadMore(true);
      }
    }
  }, [description]);

  return (
    <div>
      <p className="text-justify">
        {readMore ? truncateText(description, 200) : description}
        <button
          onClick={() => setReadMore(false)}
          className="ml-2 text-primary font-semibold cursor-pointer transition-all ease-out duration-500 hover:text-[#000000]"
        >
          Read More
        </button>
      </p>
    </div>
  );
};

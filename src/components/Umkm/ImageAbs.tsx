import React from "react";

const ImageAbs = () => {
  return (
    <div>
      <img
        src="/Images/BatikRangRang.png"
        alt="Batik RangRang"
        className="w-full object-contain -translate-y-[100px] opacity-20 rotate-180"
      />
      <img
        src="/Images/gapura2.svg"
        alt="Side"
        className="z-[100] w-[300px] object-contain absolute bottom-0 left-[0]"
      />
      <img
        src="/Images/gapura.svg"
        alt="Side"
        className="z-[100] w-[300px] object-contain absolute bottom-0 right-[0]"
      />

      <img
        src="/Images/Side Right.png"
        alt="Side"
        className="w-[300px] object-contain absolute top-[40vh] right-[20px]"
      />
      <img
        src="/Images/Side.png"
        alt="Side"
        className="w-[300px] object-contain absolute top-[40vh] left-[20px]"
      />
    </div>
  );
};

export default ImageAbs;

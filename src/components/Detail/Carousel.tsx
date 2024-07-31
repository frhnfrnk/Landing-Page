import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React from "react";

const CarouselComponent = ({ img }: any) => {
  return (
    <Carousel className="w-3/4 mx-auto">
      <CarouselContent>
        {img &&
          img.map((image: any, index: number) => (
            <CarouselItem key={index}>
              <img
                src={image}
                alt="carousel"
                className="w-full h-full object-cover rounded-md shadow-lg border-2 border-white"
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      {img && img.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default CarouselComponent;

// page.js
"use client";

import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import classes from "@/app/Page.module.css";
import { use, useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaStore, FaUmbrellaBeach } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SuspenseWrapper from "./Suspense/SuspenWrapper";
import { useAppDispatch } from "@/lib/store";
import { toast } from "./ui/use-toast";
import { logout } from "@/lib/features/auth/authSlice";
import { findAllUmkm } from "@/lib/features/umkm/umkmSlice";
import { findAllWisata } from "@/lib/features/wisata/wisataSlice";
import { findAllPeternakan } from "@/lib/features/peternakan/peternakanSlice";
import { GiCow } from "react-icons/gi";

interface DataMarker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  image?: string[];
}

function Map() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [data, setData] = useState<DataMarker[]>([]);
  const [filteredData, setFilteredData] = useState<DataMarker[]>([]);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMarker, setSelectedMarker] = useState<DataMarker | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fetchDataReport = async () => {
    setLoading(true);
    let umkm = await dispatch(findAllUmkm());
    let wisata = await dispatch(findAllWisata());
    let peternakan = await dispatch(findAllPeternakan());

    if (umkm.payload && wisata.payload && peternakan.payload) {
      const data = umkm.payload.map((item: any) => ({
        id: item._id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        image: item.image,
        category: "umkm",
      }));

      const dataWisata = wisata.payload.map((item: any) => ({
        id: item._id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        image: item.image,
        category: "wisata",
      }));

      const dataPeternakan = peternakan.payload.map((item: any) => ({
        id: item._id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        image: item.image,
        category: "peternakan",
      }));

      setData([...data, ...dataWisata, ...dataPeternakan]);
      setFilteredData([...data, ...dataWisata, ...dataPeternakan]);
    } else {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataReport();
  }, []);

  useEffect(() => {
    if (params.has("latitude") && params.has("longitude")) {
      const latitude = Number(params.get("latitude"));
      const longitude = Number(params.get("longitude"));
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 20,
        });
      }
    }
  }, [params, data]);

  const zoomToSelectedLoc = (
    e: React.MouseEvent<HTMLButtonElement>,
    marker: DataMarker
  ) => {
    e.stopPropagation();
    setSelectedMarker(marker);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [marker.longitude, marker.latitude],
        zoom: 15,
      });
    }
  };

  const selectCategory = (value: string) => {
    console.log(value);
    setSelectedCategory(value);
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <main className={classes.mainStyle}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      <MapGL
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/standard"
        initialViewState={{
          latitude: -8.7333304,
          longitude: 115.5333312,
          zoom: 11.5,
        }}
        maxZoom={20}
        minZoom={11.5}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {filteredData.map((location: DataMarker) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <button
              className={classes.marker}
              onClick={(e) => zoomToSelectedLoc(e, location)}
            >
              {
                {
                  umkm: <FaStore color="red" size={24} />,
                  wisata: <FaUmbrellaBeach color="blue" size={24} />,
                  peternakan: <GiCow color="#562b00" size={24} />,
                }[location.category]
              }
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            offset={25}
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={false}
          >
            {
              {
                umkm: (
                  <h3 className="bg-red-500 text-white font-bold text-center py-2 text-xl uppercase font-sirukota">
                    {selectedMarker.name}
                  </h3>
                ),
                wisata: (
                  <h3 className="bg-blue-500 text-white font-bold text-center py-2 text-xl uppercase font-sirukota">
                    {selectedMarker.name}
                  </h3>
                ),
                peternakan: (
                  <h3 className="bg-yellow-500 text-white font-bold text-center py-2 text-xl uppercase font-sirukota">
                    {selectedMarker.name}
                  </h3>
                ),
              }[selectedMarker.category]
            }
            <div className={classes.popupInfo}>
              <img
                src={
                  selectedMarker.image
                    ? selectedMarker.image.length > 0
                      ? selectedMarker.image[0]
                      : "/images/no-image.jpg"
                    : "/images/no-image.jpg"
                }
                alt={selectedMarker.name}
              />
              <Link href={`/${selectedMarker.category}/${selectedMarker.id}`}>
                <p className="text-center text-blue-500 mt-2">Detail</p>
              </Link>
            </div>
          </Popup>
        ) : null}

        <div className="flex flex-row-reverse gap-5 absolute top-4 right-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-white bg-primary px-2 rounded-md"
          >
            <IoMdArrowRoundBack size={24} />
            <span>Back</span>
          </button>
          <Select onValueChange={selectCategory}>
            <SelectTrigger
              className="w-[180px] bg-primary text-white outline-none border-0 focus:ring-0 rounded-md px-2 py-1
            "
            >
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="umkm">UMKM</SelectItem>
              <SelectItem value="wisata">Wisata</SelectItem>
              <SelectItem value="peternakan">Peternakan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </MapGL>
    </main>
  );
}

export default function MapComponent() {
  return (
    <SuspenseWrapper>
      <Map />
    </SuspenseWrapper>
  );
}

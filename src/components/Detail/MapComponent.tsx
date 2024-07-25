"use client";

import MapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "@/app/styles/Minimap.module.css";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import SuspenseWrapper from "./Suspense";

function Map({ coordinate }: any) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const mapRef = useRef<MapRef | null>(null);

  if (
    !coordinate ||
    isNaN(coordinate.latitude) ||
    isNaN(coordinate.longitude)
  ) {
    return <div>Invalid coordinates</div>;
  }

  return (
    <main className={classes.mainStyle}>
      <MapGL
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          zoom: 15,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <Marker latitude={coordinate.latitude} longitude={coordinate.longitude}>
          <button className={classes.marker}>
            <FaMapMarkerAlt className="text-red-500 text-5xl" />
          </button>
        </Marker>

        <div className="flex gap-5 absolute top-4 right-4">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${coordinate.latitude},${coordinate.longitude}`}
            target="_blank"
          >
            <button className="bg-primary text-white px-4 py-2 rounded-md shadow-md">
              Buka di Maps
            </button>
          </Link>
        </div>
      </MapGL>
    </main>
  );
}

export default function MapComponent({ data }: any) {
  return (
    <SuspenseWrapper>
      {data ? <Map coordinate={data} /> : <div>Loading...</div>}
    </SuspenseWrapper>
  );
}

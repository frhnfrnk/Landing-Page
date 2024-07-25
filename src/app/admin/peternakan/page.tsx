"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Loading from "@/components/Loading";
import TablePeternakan from "@/components/Table/TablePeternakan";
import TableWisata from "@/components/Table/TableWisata";
import {
  emtpyDataPeternakan,
  findAllPeternakan,
} from "@/lib/features/peternakan/peternakanSlice";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Peternakan } from "@/utils/types/peternakan";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNewFarm = () => {
    dispatch(emtpyDataPeternakan());
    router.push("/admin/peternakan/add");
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-xl font-semibold">Wisata</h1>
      <PrimaryButton onClick={handleNewFarm}>
        Tambahkan Peternakan
      </PrimaryButton>
    </div>
  );
};

const PeternakanPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [peternakanData, setPeternakanData] = useState([] as Peternakan[]);

  const status = useAppSelector((state) => state.peternakan.status);
  const peternakanState = useAppSelector(
    (state) => state.peternakan.peternakan
  );

  useEffect(() => {
    dispatch(findAllPeternakan())
      .unwrap()
      .then((res) => {
        setPeternakanData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      {status === "loading" ? (
        <Loading />
      ) : peternakanData ? (
        <TablePeternakan data={peternakanData} />
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default PeternakanPage;

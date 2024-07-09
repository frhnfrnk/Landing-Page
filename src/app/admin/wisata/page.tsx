"use client";
import { ButtonDropdown } from "@/components/Button/ButtonDropDown";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Loading from "@/components/Loading";
import TableWisata from "@/components/Table/TableWisata";
import { toast } from "@/components/ui/use-toast";
import {
  emtpyDatawisata,
  findAllWisata,
  setDatawisata,
} from "@/lib/features/wisata/wisataSlice";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Umkm } from "@/utils/types/umkm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNewWisata = () => {
    dispatch(emtpyDatawisata());
    router.push("/admin/wisata/add");
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-xl font-semibold">Wisata</h1>
      <PrimaryButton onClick={handleNewWisata}>Tambahkan Wisata</PrimaryButton>
    </div>
  );
};

// const SearchBar = ({ setQuery, setFilter }: any) => {
//   const [keyword, setKeyword] = useState("");

//   const handleKeyword = (e: any) => {
//     e.preventDefault();
//     setQuery({ keyword, page: 1 });
//   };

//   return (
//     <div className="mt-2">
//       <p className="text-sm mb-2">Cari Wisata</p>
//       <div className="flex gap-2">
//         <form
//           className="flex-grow relative hidden md:block"
//           onSubmit={handleKeyword}
//         >
//           <div className="absolute inset-y-0 text-gray-500 start-0 flex items-center ps-3 pointer-events-none">
//             <IoIosSearch />
//           </div>
//           <input
//             type="text"
//             id="search-navbar"
//             className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Search..."
//             onChange={(e) => setKeyword(e.target.value)}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

const Article: React.FC = () => {
  const dispatch = useAppDispatch();
  const [wisata, setWisata] = useState([] as Umkm[]);

  const status = useAppSelector((state) => state.umkm.status);
  const wisataState = useAppSelector((state) => state.umkm.umkm);

  useEffect(() => {
    dispatch(findAllWisata())
      .unwrap()
      .then((res) => {
        setWisata(res);
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
      ) : wisata ? (
        <TableWisata data={wisata} />
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default Article;

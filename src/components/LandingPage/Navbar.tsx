"use client";
import { useAppSelector } from "@/lib/store";
import { User } from "@/utils/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userState = useAppSelector((state) => state.auth.user) ?? ({} as User);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLogin(true);
      setUser(userState);
    } else {
      setIsLogin(false);
      setUser({} as User);
    }
  }, [isAuthenticated]);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`z-[1000] font-primary flex flex-col items-end flex-col justify-end mx-[16px] lg:mx-[64px] fixed top-[32px] left-0 right-0 transition-transform duration-300   ${
          isVisible ? "translate-y-0" : "-translate-y-[100px]"
        }`}
      >
        <div className="w-full flex items-center px-[16px] lg:px-[32px] bg-white h-[48px] lg:h-[64px] rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <Link href="/" className="w-2/3">
            <div className="cursor-pointer flex items-center">
              <img
                src="/Logo/Nuspen.png"
                alt="Nirwana Nusapenida"
                className="w-[48px] h-[48px]"
              />
              <p className="text-lg lg:text-2xl font-sirukota uppercase text-primary">
                Nirwana Nusapenida
              </p>
            </div>
          </Link>
          <ul
            className={`w-1/3  hidden md:flex  justify-end font-sirukota uppercase text-2xl  flex-row  space-x-8 rtl:space-x-reverse `}
          >
            <li className="group w-full md:w-auto flex items-center justify-end transition duration-300">
              <Link href="/umkm" className="w-full ">
                UMKM
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>

            <li className="group w-full md:w-auto flex items-center justify-end transition duration-300">
              <Link href="/wisata" className="w-full ">
                Wisata
                <span className="block max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>
            <li className="group w-full md:w-auto flex items-center justify-end transition duration-300">
              <Link href="/budaya" className="w-full ">
                Budaya
                <span className="block max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>
            <li className="group w-full md:w-auto flex items-center justify-end transition duration-300">
              <Link href="#" className="w-full ">
                Pelaporan
                <span className="block max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>
          </ul>
          <div
            className="block md:hidden w-1/3 md:w-1/2 flex justify-end"
            onClick={toggleMenu}
          >
            <img
              src="/Icons/Hamburger.svg"
              alt="Menu"
              className="w-7 h-7 cursor-pointer"
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openMenu ? "w-[40%]" : "w-0"
          }  bg-white rounded-2xl mt-2 md:hidden`}
        >
          <ul
            className={`w-full h-full  font-sirukota uppercase text-xl  py-3 px-6  flex-col flex items-end justify-center space-y-2 rtl:space-y-reverse `}
          >
            <li className="group md:w-auto flex items-center justify-end transition duration-300">
              <Link href="/umkm" className="w-full ">
                UMKM
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>

            <li className="group  md:w-auto flex items-center justify-end transition duration-300">
              <Link href="/wisata" className="w-full ">
                Wisata
                <span className="block max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>
            <li className="group  md:w-auto flex items-center justify-end transition duration-300">
              <Link href="/budaya" className="w-full ">
                Budaya
                <span className="block max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>

            <li className="group  md:w-auto flex items-center justify-end transition duration-300">
              <Link href="/pelaporan" className="w-full ">
                Pelaporan
                <span className="block max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 h-0.5 bg-black"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

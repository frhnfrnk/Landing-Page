"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BiSolidLandscape } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CiShop } from "react-icons/ci";

interface MenuItemProps {
  title: string;
  link?: string;
  children: React.ReactNode;
  open: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  link = "#",
  children,
  open,
}) => {
  return (
    <li
      className={`rounded-md text-white hover:text-primary hover:bg-white hover:font-bold ${
        open ? "aspect-square flex items-center justify-center" : "p-0 md:p-1"
      }`}
    >
      <Link href={link}>
        <p
          className={`flex items-center transition-all ${
            open ? "p-0 justify-center" : "p-2"
          } space-x-3`}
        >
          {children}
          {!open && <span className="font-semibold">{title}</span>}
        </p>
      </Link>
    </li>
  );
};

const menu = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    children: <FaHome className="w-5 h-5" />,
  },
  {
    title: "UMKM",
    link: "/admin/umkm",
    children: <CiShop className="w-5 h-5" />,
  },
  {
    title: "Wisata",
    link: "/admin/wisata",
    children: <BiSolidLandscape className="w-5 h-5" />,
  },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  return (
    <div
      className={`flex flex-col sticky top-0 z-[1000] ${
        open ? "lg:w-14 w-full" : "lg:w-60 w-full"
      } lg:h-screen p-3  bg-primary duration-300`}
    >
      <div className="space-y-3">
        <div
          className={`flex items-center lg:px-0 px-2 ${
            open ? "justify-center" : " justify-between"
          }`}
        >
          {!open && (
            <h2 className="text-xl font-bold text-white">Deepublish</h2>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="lg:block hidden focus:outline-none transition-all duration-300 bg-white text-primary p-2 rounded-md"
          >
            {!open ? <HiOutlineMenuAlt1 /> : <FiMenu />}
          </button>
          <button
            onClick={() => setDrop(!drop)}
            className="lg:hidden focus:outline-none transition-all duration-300 bg-white text-primary p-2 rounded-md"
          >
            {open ? <HiOutlineMenuAlt1 /> : <FiMenu />}
          </button>
        </div>
        <div className={`flex-1 md:block ${drop ? "block" : "hidden"}`}>
          <ul className="p-0 lg:pb-4 space-y-1 md:space-y-1  text-base">
            {menu.map((item, index) => (
              <MenuItem
                key={index}
                open={open}
                title={item.title}
                link={item.link}
              >
                {item.children}
              </MenuItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

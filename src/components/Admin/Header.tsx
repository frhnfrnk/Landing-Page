"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import { User } from "@/utils/types/user";
import Link from "next/link";
import ModalLogout from "./ModalLogout";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const userData = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);
  return (
    <div className="h-14 shadow-sm py-4 px-10 flex  justify-between items-center">
      <BreadcrumbComponent />
      <div className="flex items-center gap-2">
        <div className="w-6 aspect-square bg-gray-300 rounded-full"></div>

        <div>
          <ModalLogout />
        </div>
      </div>
    </div>
  );
};

export default Header;

const BreadcrumbComponent = () => {
  const pathName = usePathname();
  const path = pathName.split("/").filter((item) => item);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {path.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${item}`} className="capitalize">
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < path.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

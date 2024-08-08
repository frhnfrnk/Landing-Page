import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - Nirwana Nusa Penida",
  description: "Berisi data-data terkait nusa penida",
};

const DashboardAdmin = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashboardAdmin;

"use client";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../Button/SecondaryButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import ModalDelete from "../Admin/ModalDeleteWisata";

const TableData = ({ data }: any) => {
  const [fetchStatus, setFetchStatus] = useState(false);

  useEffect(() => {
    if (!fetchStatus) {
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item._id}>
            <TableCell className="w-1/4">{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <SecondaryButton className="text-xs border-[1px] bg-primary">
                  <Link href={`/admin/wisata/edit/${item._id}`}>Edit</Link>
                </SecondaryButton>
                <ModalDelete data={item} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TableInfo: React.FC = ({ data }: any) => {
  const MAX = 10;
  const dataCount = data.length;
  const pageCount = Math.ceil(dataCount / MAX);
  const [page, setPage] = useState(1);

  return (
    <div className="flex justify-between items-center mt-2 text-xs">
      <p>
        Showing 1 to {dataCount > MAX ? MAX : dataCount} of {dataCount} entries
      </p>
      <div className="flex border-[1px] rounded-lg border-primary overflow-hidden">
        {page > 1 && (
          <SecondaryButton
            className="border-none rounded-none"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </SecondaryButton>
        )}
        <div className="border-x-[1px] border-y-none border-0 rounded-none flex items-center px-3">
          {page}
        </div>
        <SecondaryButton
          onClick={() => setPage(page + 1)}
          className="border-none rounded-none"
        >
          Next
        </SecondaryButton>
      </div>
    </div>
  );
};

const TableWisata = ({ data }: any) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <TableData data={data} />
          </div>
          {/* <TableInfo data={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default TableWisata;

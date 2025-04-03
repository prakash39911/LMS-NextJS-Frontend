"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.

export type Payment = {
  id: string;
  amount: number;
  courseName: string;
  purchaseDate: string;
};

async function handleClick(id: string) {
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchedResult = await fetch(
    `${API_END_POINT}api/updateuserdata/generateDownload/${id}`,
    {
      method: "GET",
    }
  );

  const blob = await fetchedResult.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "invoice.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Button
          variant={"outline"}
          className="bg-transparent"
          onClick={() => handleClick(payment.id)}
        >
          Download Invoice
        </Button>
      );
    },
  },
];

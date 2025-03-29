import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { getToken } = await auth();

  const token = await getToken();

  const fetchData = await fetch(
    `${API_END_POINT}api/payment/isPaymentCaptured/${courseId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const finalData = await fetchData.json();

  if (finalData?.status) {
    return (
      <Card className="w-[400px] bg-gray-700 border border-gray-800 shadow-md shadow-black">
        <CardHeader>
          <CardTitle className="text-xl text-gray-300">
            Payment Status
          </CardTitle>
          <CardDescription className="text-gray-300">
            Please Wait while we process your payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {finalData?.data?.payment_status === "CAPTURED" ? (
            <div>You Payment is successfull</div>
          ) : (
            "Details not yet updated"
          )}
        </CardContent>
      </Card>
    );
  }
}

import ButtonComponent from "@/components/ButtonComponent";
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
  const isPaymentSuccess = finalData?.status;

  if (!isPaymentSuccess) {
    return (
      <div className="flex vertical-center justify-center items-center text-gray-400 text-3xl">
        You are not authorized
      </div>
    );
  }

  if (isPaymentSuccess) {
    return (
      <div className="flex vertical-center items-center justify-center">
        <Card className="w-[400px] bg-gray-900 border border-blue-900 shadow-md shadow-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex justify-center text-gray-300">
              Payment Status
            </CardTitle>
            <CardDescription className="text-gray-300 flex justify-center">
              Fetching your details
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-200">
            {finalData?.data?.payment_status === "CAPTURED" ? (
              <div className="flex flex-col gap-2 items-center">
                <div className="flex justify-center text-gray-100 text-xl font-bold">
                  You Payment is successfull
                </div>
                <div>
                  <ButtonComponent
                    btnName="Go to Purchased Course"
                    link={`/learn/${courseId}`}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center text-gray-100 text-xl">
                Your Payment was Failed
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

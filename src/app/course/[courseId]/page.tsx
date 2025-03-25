import CoursePageComponent from "@/components/CoursePageComponent";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { sessionClaims, getToken, userId } = await auth();
  const token = await getToken();
  const isTeacher = sessionClaims?.metadata.role === "teacher";

  try {
    const apiUrl = isTeacher
      ? `${API_END_POINT}api/course/isOwnerOfVideo/${courseId}`
      : `${API_END_POINT}api/course//isAlreadyPurchased/${courseId}`;

    const isPurchased = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const apiResponseData = await isPurchased.json();

    const response = await fetch(
      `${API_END_POINT}api/course/detail/${courseId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const course = data.data;

    return (
      <div>
        <CoursePageComponent
          course={course}
          isTeacher={isTeacher}
          userId={userId}
          isPurchased={apiResponseData.status}
          isTeacherOwner={apiResponseData.status}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

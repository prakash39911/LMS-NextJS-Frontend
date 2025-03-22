import CoursePageComponent from "@/components/CoursePageComponent";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const { sessionClaims, getToken, userId } = await auth();
  const token = await getToken();
  const isTeacher = sessionClaims?.metadata.role === "teacher";

  try {
    const apiUrl = isTeacher
      ? `http://localhost:8000/api/course/isOwnerOfVideo/${courseId}`
      : `http://localhost:8000/api/course//isAlreadyPurchased/${courseId}`;

    const isPurchased = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const apiResponseData = await isPurchased.json();

    const response = await fetch(
      `http://localhost:8000/api/course/detail/${courseId}`,
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

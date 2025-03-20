import CoursePageComponent from "@/components/CoursePageComponent";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { sessionClaims } = await auth();
  const isTeacher = sessionClaims?.metadata.role === "teacher";

  try {
    const { courseId } = await params;
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
        <CoursePageComponent course={course} isTeacher={isTeacher} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

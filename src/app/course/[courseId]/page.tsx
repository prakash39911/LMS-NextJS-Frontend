import CoursePageComponent from "@/components/CoursePageComponent";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
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
        <CoursePageComponent course={course} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
  const { courseId } = await params;
  return <div>Course-Id- {courseId}</div>;
}

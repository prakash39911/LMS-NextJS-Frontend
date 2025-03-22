import CourseCard from "@/components/CourseCard";
import FloatingFilter from "@/components/FloatingFilter";
import React from "react";

export default async function AllCourses({
  searchParams,
}: {
  searchParams: Promise<GetAllCoursesParams>;
}) {
  const searchParamsValue = await searchParams;

  try {
    // Convert searchParamsValue to a query string
    const queryString = new URLSearchParams(searchParamsValue).toString();

    // Append the query string to the URL
    const response = await fetch(
      `http://localhost:8000/api/course/getAllCourse?${queryString}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const courses = data.data;

    return (
      <div>
        <div className="relative">
          <div className="flex flex-row gap-6 flex-wrap ml-6 mt-5">
            {courses &&
              courses.map((eachCourse: courseType) => (
                <div key={eachCourse.id}>
                  <CourseCard course={eachCourse} />
                </div>
              ))}
          </div>
        </div>
        <FloatingFilter />
      </div>
    );
  } catch (error) {
    console.log(error);

    return (
      <div className="flex vertical-center justify-center items-center text-gray-400 text-4xl">
        Something Went Wrong, Please Try again
      </div>
    );
  }
}

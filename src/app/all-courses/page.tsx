import CourseCard from "@/components/CourseCard";
import FloatingFilter from "@/components/FloatingFilter";
import React from "react";

export default async function AllCourses({
  searchParams,
}: {
  searchParams: Promise<GetAllCoursesParams>;
}) {
  const searchParamsValue = await searchParams;
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // Convert searchParamsValue to a query string
    const queryString = new URLSearchParams(searchParamsValue).toString();

    // Append the query string to the URL
    const response = await fetch(
      `${API_END_POINT}api/course/getAllCourse?${queryString}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const courses = data.data;

    return (
      <div>
        <div className="relative">
          <div className="flex flex-col items-center md:items-start gap-6 flex-wrap mt-5 md:ml-6">
            <div className="mx-auto text-4xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-700">
              All Courses
            </div>
            <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-5">
              {courses?.length === 0 && (
                <div className="flex mx-auto mt-5 text-3xl text-gray-400">
                  No Courses Matches the Filter
                </div>
              )}
              {courses &&
                courses.map((eachCourse: courseType) => (
                  <div key={eachCourse.id}>
                    <CourseCard course={eachCourse} />
                  </div>
                ))}
            </div>
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

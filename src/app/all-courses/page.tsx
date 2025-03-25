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
          <div className="flex flex-row gap-6 flex-wrap ml-6 mt-5">
            {courses?.length === 0 && (
              <div className="flex justify-center text-2xl text-gray-300">
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

import CourseCard from "@/components/CourseCard";
import React from "react";

export default async function AllCourses() {
  try {
    const response = await fetch(
      "http://localhost:8000/api/course/getAllCourse"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const courses = data.data;

    return (
      <div className="flex flex-row gap-6 flex-wrap ml-6 mt-5">
        {courses &&
          courses.map((eachCourse: courseType) => (
            <div key={eachCourse.id}>
              <CourseCard course={eachCourse} />
            </div>
          ))}
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

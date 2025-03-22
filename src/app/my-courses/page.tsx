import ButtonComponent from "@/components/ButtonComponent";
import CourseCard from "@/components/CourseCard";
import { auth } from "@clerk/nextjs/server";
import { ArrowBigRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MyCourses() {
  const { sessionClaims, getToken } = await auth();
  const token = await getToken();

  if (sessionClaims?.metadata.role === "student") redirect("/");

  try {
    const response = await fetch(
      "http://localhost:8000/api/course/getCourseForteacher",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error while fetching data");
    }

    const finalData = await response.json();
    const courses = finalData.data;

    if (courses.length === 0) {
      return (
        <div className="flex flex-col gap-2 justify-center items-center vertical-center text-3xl text-gray-400">
          <span>You have not created any Course Yet</span>
          <ButtonComponent
            btnName="Go to Create Course section"
            link="/create-course"
          />
          <ArrowBigRight />
        </div>
      );
    }

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

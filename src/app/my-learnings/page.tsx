import CourseCard from "@/components/CourseCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MyLearnings() {
  const { sessionClaims, getToken } = await auth();
  const token = await getToken();

  if (sessionClaims?.metadata.role === "teacher") redirect("/");

  try {
    const response = await fetch(
      "http://localhost:8000/api/course/getCourseForStudent",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const finalData = await response.json();

    if (!finalData.status) {
      return (
        <div className="flex vertical-center justify-center items-center text-gray-400 text-4xl">
          {finalData.message}
        </div>
      );
    }
    const courses = finalData.data;

    return (
      <div className="flex flex-col gap-6 flex-wrap ml-6 mt-5">
        <div className="text-3xl font-bold text-gray-300 text-center">
          Purchased Courses
        </div>
        {courses &&
          courses.map((eachCourse: courseType) => (
            <div key={eachCourse.id} className="flex flex-row flex-wrap gap-5">
              <CourseCard course={eachCourse} ispurchasedCourse={true} />
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

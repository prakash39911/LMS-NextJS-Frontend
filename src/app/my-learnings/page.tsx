import CourseCard from "@/components/CourseCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MyLearnings() {
  const { sessionClaims, getToken } = await auth();
  const token = await getToken();

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (sessionClaims?.metadata.role === "teacher") redirect("/");

  try {
    const response = await fetch(
      `${API_END_POINT}api/course/getCourseForStudent`,
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
      <div className="flex flex-col gap-6 ml-6 mt-5">
        <div className="mx-auto text-4xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-700">
          Purchased Courses
        </div>
        <div className="flex flex-wrap gap-5">
          {courses &&
            courses.map((eachCourse: courseType) => (
              <div key={eachCourse.id}>
                <CourseCard course={eachCourse} ispurchasedCourse={true} />
              </div>
            ))}
        </div>
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

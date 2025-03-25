import ButtonComponent from "@/components/ButtonComponent";
import VideoPlayerComponent from "@/components/VideoPlayerComponent";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  try {
    const { courseId } = await params;
    const { getToken, sessionClaims } = await auth();
    const token = await getToken();
    const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

    const isTeacher = sessionClaims?.metadata.role === "teacher";

    const apiUrl = isTeacher
      ? `${API_END_POINT}api/course/isOwnerOfVideo/${courseId}`
      : `${API_END_POINT}api/course/learn/${courseId}`;

    const isUserAllowed = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await isUserAllowed.json();

    if (!data.status) {
      return (
        <div className="flex flex-col gap-2 justify-center vertical-center items-center">
          <div className="text-gray-300 text-3xl ">{data.message}</div>
          <div>
            <ButtonComponent btnName="Go to Your Courses" link="/my-courses" />
          </div>
        </div>
      );
    }

    const course = data.data;

    return (
      <div className="w-full vertical-center">
        <VideoPlayerComponent course={course} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="flex vertical-center items-center justify-center text-gray-400">
        Something went wrong
      </div>
    );
  }
}

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

    const isTeacher = sessionClaims?.metadata.role === "teacher";

    const apiUrl = isTeacher
      ? `http://localhost:8000/api/course/isOwnerOfVideo/${courseId}`
      : `http://localhost:8000/api/course/learn/${courseId}`;

    const isUserAllowed = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await isUserAllowed.json();

    if (!data.status) {
      return (
        <div className="text-gray-300 text-3xl flex justify-center vertical-center items-center">
          {data.message}
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
